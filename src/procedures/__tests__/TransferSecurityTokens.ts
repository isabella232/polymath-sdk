import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import { BigNumber, TransferStatusCode } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransferSecurityTokens } from '../../procedures/TransferSecurityTokens';
import { Procedure } from '../../procedures/Procedure';
import * as transferSecurityTokensModule from '../../procedures/TransferSecurityTokens';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  TransferSecurityTokensProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import * as shareholderFactoryModule from '../../entities/factories/ShareholderFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Shareholder } from '../../entities';
import { SecurityToken } from '../../entities/SecurityToken/SecurityToken';
import { Wallet } from '../../Wallet';
import { Factories } from '../../Context';

const params: TransferSecurityTokensProcedureArgs = {
  symbol: 'TEST',
  to: '0x8b0EC3e41C7710765675963bD692cbBDC6De8670',
  amount: new BigNumber(100),
};

describe('TransferSecurityTokens', () => {
  let target: TransferSecurityTokens;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.shareholderFactory = shareholderFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);

    // Instantiate TransferSecurityTokens
    target = new TransferSecurityTokens(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have TransferSecurityTokens type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.TransferSecurityTokens);
    });
  });

  describe('TransferSecurityTokens', () => {
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
  });

  test('should add a transaction to the queue to execute a transfer security token using a different sender address', async () => {
    target = new TransferSecurityTokens(
      { ...params, from: '0x1FB52cef867d95E69d398Fe9F6486fAF92C7ED7F' },
      contextMock.getMockInstance()
    );
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve('0x0e6b236a504fce78527497e46dc90c0a6fdc9495') })
    );

    securityTokenMock.mock(
      'canTransferFrom',
      Promise.resolve({
        statusCode: TransferStatusCode.TransferSuccess,
      })
    );

    const addTransactionSpy = spy(target, 'addTransaction');
    securityTokenMock.mock('transferFromWithData', Promise.resolve('TransferFromWithData'));

    await target.prepareTransactions();

    expect(
      addTransactionSpy
        .getCall(0)
        .calledWith(securityTokenMock.getMockInstance().transferFromWithData)
    ).toEqual(true);
    expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
      PolyTransactionTag.TransferSecurityTokens
    );
    expect(addTransactionSpy.callCount).toEqual(1);
  });

  test('should throw error if canTransferFrom method returns status code different than success', async () => {
    const from = '0x1FB52cef867d95E69d398Fe9F6486fAF92C7ED7F';
    const reasonCode = '0x50';

    target = new TransferSecurityTokens({ ...params, from }, contextMock.getMockInstance());
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(from) }));

    securityTokenMock.mock(
      'canTransfer',
      Promise.resolve({
        statusCode: TransferStatusCode.TransferFailure,
        reasonCode,
      })
    );

    await expect(target.prepareTransactions()).rejects.toThrowError(
      new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `[${TransferStatusCode.TransferFailure}] ${from} is not allowed to transfer ${
          params.symbol
        } to ${params.to}. Possible reason: ${reasonCode}`,
      })
    );
  });

  test('should successfully refresh the corresponding balance of each shareholder involved', async () => {
    const from = '0x1FB52cef867d95E69d398Fe9F6486fAF92C7ED7F';
    const refreshStub = shareholderFactoryMock.mock('refresh', Promise.resolve());
    const securityTokenId = SecurityToken.generateId({ symbol: params.symbol });
    const resolverValue = await transferSecurityTokensModule.createTransferSecurityTokensResolver(
      factoriesMockedSetup,
      params.symbol,
      from,
      params.to
    )();
    expect(
      refreshStub.getCall(0).calledWithExactly(
        Shareholder.generateId({
          securityTokenId,
          address: from,
        })
      )
    ).toEqual(true);
    expect(
      refreshStub.getCall(1).calledWithExactly(
        Shareholder.generateId({
          securityTokenId,
          address: params.to,
        })
      )
    ).toEqual(true);
    expect(resolverValue).toEqual([undefined, undefined]);
    expect(refreshStub.callCount).toEqual(2);
  });
});
