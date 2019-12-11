import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { ControllerRedeem } from '../../procedures/ControllerRedeem';
import * as controllerRedeemModule from '../../procedures/ControllerRedeem';
import { Procedure } from '../../procedures/Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ControllerRedeemProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import { mockFactories } from '../../testUtils/mockFactories';
import * as shareholderFactoryModule from '../../entities/factories/ShareholderFactory';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import { Factories } from '../../Context';
import { SecurityToken, Shareholder } from '../../entities';

const params: ControllerRedeemProcedureArgs = {
  symbol: 'TEST1',
  from: '0x2222222222222222222222222222222222222222',
  amount: new BigNumber(1),
};

const ownerAddress = '0x5555555555555555555555555555555555555555';

describe('ControllerRedeem', () => {
  let target: ControllerRedeem;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;

  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ControllerRedeem
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('balanceOf', Promise.resolve(params.amount));
    securityTokenMock.mock('controller', Promise.resolve(ownerAddress));

    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(ownerAddress) }));
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.shareholderFactory = shareholderFactoryMock.getMockInstance();
    factoriesMockedSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);

    // Instantiate ControllerRedeem
    target = new ControllerRedeem(params, contextMock.getMockInstance());
  });

  describe('Types', () => {
    test('should extend procedure and have ControllerRedeem type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ControllerRedeem);
    });
  });

  describe('ControllerRedeem', () => {
    test('should add a transaction to the queue to execute a controller redeem', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('controllerRedeem', Promise.resolve('ControllerRedeem'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().controllerRedeem)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ControllerRedeem);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock
        .mock('getSecurityTokenInstanceFromTicker')
        .withArgs(params.symbol)
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params.symbol}`,
        })
      );
    });

    test('should throw error if balanceOf is less than amount being redeemed', async () => {
      securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(0)));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InsufficientBalance,
          message: `Balance of 0 is less than the requested amount of ${params.amount.toNumber()} being redeemed`,
        })
      );
    });

    test('should throw an error if the current wallet is not the Security Token controller', async () => {
      securityTokenMock.mock('controller', Promise.resolve('Random'));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the controller of this Security Token to redeem tokens. Did you remember to call "setController"?`,
        })
      );
    });

    test('should call error on inappropriate params "from" address', async () => {
      // Instantiate ControllerRedeem with incorrect args instead
      target = new ControllerRedeem(
        {
          ...params,
          from: 'Inappropriate',
        },
        contextMock.getMockInstance()
      );
      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Provided \"from\" address is invalid: Inappropriate`,
        })
      );
    });
  });

  test('should successfully resolve controller redeem', async () => {
    const refreshStub = shareholderFactoryMock.mock('refresh', Promise.resolve());
    const securityTokenId = SecurityToken.generateId({ symbol: params.symbol });
    const resolverValue = await controllerRedeemModule.createRefreshShareholdersResolver(
      factoriesMockedSetup,
      params.symbol,
      params.from
    )();
    expect(
      refreshStub.getCall(0).calledWithExactly(
        Shareholder.generateId({
          securityTokenId,
          address: params.from,
        })
      )
    ).toEqual(true);

    expect(resolverValue).toEqual(undefined);
    expect(refreshStub.callCount).toEqual(1);
  });

  test('should refresh the security token factory with resolver', async () => {
    const refreshStub = securityTokenFactoryMock.mock('refresh', Promise.resolve(undefined));

    const resolverValue = await controllerRedeemModule.createRefreshSecurityTokenResolver(
      factoriesMockedSetup,
      params.symbol
    )();

    expect(
      refreshStub.getCall(0).calledWithExactly(SecurityToken.generateId({ symbol: params.symbol }))
    ).toEqual(true);
    expect(resolverValue).toEqual(undefined);
    expect(refreshStub.callCount).toEqual(1);
  });
});
