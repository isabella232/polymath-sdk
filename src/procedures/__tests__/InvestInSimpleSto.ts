import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber, TransferStatusCode } from '@polymathnetwork/contract-wrappers';
import { InvestInSimpleSto } from '../InvestInSimpleSto';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  Currency,
  ErrorCode,
  InvestInSimpleStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as investInSimpleStoModule from '../InvestInSimpleSto';
import * as simpleStoFactoryModule from '../../entities/factories/SimpleStoFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { SimpleSto, SecurityToken } from '../../entities';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import { Wallet } from '../../Wallet';
import { ApproveErc20 } from '../../procedures';

const simpleParams: InvestInSimpleStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  amount: new BigNumber(1),
};

const simpleStoObject = {
  isFinalized: false,
  isPaused: false,
  startDate: new Date(2010, 1),
  beneficialInvestmentsAllowed: true,
  fundraiseCurrencies: [Currency.ETH],
};

const treasuryWallet = '0x1111111111111111111111111111111111111111';
const currentWalletAddress = '0x2222222222222222222222222222222222222222';
const beneficiaryAddress = '0x3333333333333333333333333333333333333333';
const polyTokenAddress = '0x8888888888888888888888888888888888888888';

describe('InvestInSimpleSto', () => {
  let target: InvestInSimpleSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;
  let simpleStoMock: MockManager<contractWrappersModule.CappedSTO_3_1_0>;

  // Mock factories
  let simpleStoFactoryMock: MockManager<simpleStoFactoryModule.SimpleStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;
  let simpleStoId: string;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test InvestInSimpleSto
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    moduleWrapperFactoryMock = ImportMock.mockClass(
      moduleWrapperFactoryModule,
      'MockedModuleWrapperFactoryModule'
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.set('moduleFactory', moduleWrapperFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');

    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    securityTokenMock.mock(
      'canTransfer',
      Promise.resolve({
        statusCode: TransferStatusCode.TransferSuccess,
        reasonCode: '0x1',
      })
    );

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', new BigNumber(10));
    polyTokenMock.mock('address', polyTokenAddress);
    polyTokenMock.mock('allowance', new BigNumber(10));
    wrappersMock.mock('isTestnet', false);
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());

    simpleStoFactoryMock = ImportMock.mockClass(simpleStoFactoryModule, 'SimpleStoFactory');

    factoryMockSetup = mockFactories();
    factoryMockSetup.simpleStoFactory = simpleStoFactoryMock.getMockInstance();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    simpleStoMock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_1_0');

    securityTokenId = SecurityToken.generateId({ symbol: simpleParams.symbol });
    simpleStoId = SimpleSto.generateId({
      securityTokenId,
      stoType: StoType.Simple,
      address: simpleParams.stoAddress,
    });

    moduleWrapperFactoryMock.mock('getModuleInstance', simpleStoMock.getMockInstance());
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(currentWalletAddress) })
    );

    simpleStoMock.mock('isFinalized', Promise.resolve(false));

    simpleStoFactoryMock.mock('fetch', simpleStoObject);

    wrappersMock.mock('getTreasuryWallet', Promise.resolve(treasuryWallet));

    // Instantiate InvestInSimpleSto with a simple sto
    target = new InvestInSimpleSto(simpleParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have InvestInSimpleSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.InvestInSimpleSto);
    });
  });

  describe('InvestInSimpleSto', () => {
    test('should add a transaction to the queue to invest in a simple sto with poly', async () => {
      simpleStoFactoryMock.mock('fetch', {
        ...simpleStoObject,
        beneficialInvestmentsAllowed: false,
        fundraiseCurrencies: [Currency.POLY],
      });
      const addTransactionSpy = spy(target, 'addTransaction');
      const addProcedureSpy = spy(target, 'addProcedure');
      simpleStoMock.mock('buyTokensWithPoly', Promise.resolve('BuyTokensWithPoly'));

      securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(10)));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(simpleStoMock.getMockInstance().buyTokensWithPoly)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.BuyTokensWithPoly
      );
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to invest in a simple sto', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleStoMock.mock('buyTokens', Promise.resolve('BuyTokens'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(simpleStoMock.getMockInstance().buyTokens)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.BuyTokens);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to invest in a simple sto on the behalf of a beneficiary', async () => {
      target = new InvestInSimpleSto(
        { ...simpleParams, beneficiary: beneficiaryAddress },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleStoMock.mock('buyTokens', Promise.resolve('BuyTokens'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(simpleStoMock.getMockInstance().buyTokens)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.BuyTokens);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw an error as a non eth currency sto does not support investing on behalf of another party', async () => {
      target = new InvestInSimpleSto(
        { ...simpleParams, beneficiary: beneficiaryAddress },
        contextMock.getMockInstance()
      );
      simpleStoFactoryMock.mock('fetch', {
        ...simpleStoObject,
        beneficialInvestmentsAllowed: true,
        fundraiseCurrencies: [Currency.POLY],
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `This STO does not support investing in POLY on behalf of someone else`,
        })
      );
    });

    test('should throw an error if the simple sto has not yet been launched or is archived', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', Promise.resolve(undefined));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `STO ${simpleParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new InvestInSimpleSto(
        {
          ...simpleParams,
          stoAddress: 'invalid',
        },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Invalid STO address invalid`,
        })
      );
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock
        .mock('getSecurityTokenInstanceFromTicker')
        .withArgs(simpleParams.symbol)
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${simpleParams.symbol}`,
        })
      );
    });

    test('should throw an error if the sto has already been finalized', async () => {
      simpleStoFactoryMock.mock('fetch', {
        ...simpleStoObject,
        isFinalized: true,
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${simpleParams.stoAddress} has already been finalized`,
        })
      );
    });

    test('should throw an error if the sto start date is in the future', async () => {
      simpleStoFactoryMock.mock('fetch', {
        ...simpleStoObject,
        startDate: new Date(2040, 0),
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot invest in STO ${simpleParams.stoAddress} because it hasn't started yet`,
        })
      );
    });

    test('should throw an error if beneficial investments are not allowed and the parameters include a beneficiary address', async () => {
      target = new InvestInSimpleSto(
        { ...simpleParams, beneficiary: beneficiaryAddress },
        contextMock.getMockInstance()
      );
      simpleStoFactoryMock.mock('fetch', {
        ...simpleStoObject,
        beneficialInvestmentsAllowed: false,
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot invest on behalf of ${beneficiaryAddress} because this STO doesn't allow beneficial investments`,
        })
      );
    });

    test('should throw an error if the sto is paused', async () => {
      simpleStoFactoryMock.mock('fetch', {
        ...simpleStoObject,
        isPaused: true,
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${simpleParams.stoAddress} is paused`,
        })
      );
    });

    test('should successfully refresh the simple sto factory with its resolver method', async () => {
      const refreshStub = simpleStoFactoryMock.mock('refresh', Promise.resolve());
      await investInSimpleStoModule.createRefreshSimpleStoFactoryResolver(
        factoryMockSetup,
        simpleStoId
      )();

      expect(refreshStub.getCall(0).calledWithExactly(simpleStoId)).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });

    test('should successfully refresh the security token factory with its resolver method', async () => {
      const refreshStub = securityTokenFactoryMock.mock('refresh', Promise.resolve());
      await investInSimpleStoModule.createRefreshSecurityTokenFactoryResolver(
        factoryMockSetup,
        securityTokenId
      )();

      expect(refreshStub.getCall(0).calledWithExactly(securityTokenId)).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
