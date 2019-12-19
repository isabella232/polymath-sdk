import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber, ContractVersion } from '@polymathnetwork/contract-wrappers';
import { TransferStatusCode } from '@polymathnetwork/contract-wrappers';
import { FinalizeSto } from '../FinalizeSto';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  FinalizeStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as finalizeStoModule from '../FinalizeSto';
import * as simpleStoFactoryModule from '../../entities/factories/SimpleStoFactory';
import * as tieredStoFactoryModule from '../../entities/factories/TieredStoFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { SimpleSto, SecurityToken, TieredSto } from '../../entities';

const simpleParams: FinalizeStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stoType: StoType.Simple,
};

const tieredParams: FinalizeStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x6666666666666666666666666666666666666666',
  stoType: StoType.Tiered,
};

const invalidSto = 'InvalidSto';
const treasuryWallet = '0x1111111111111111111111111111111111111111';
const amountOfTokens = new BigNumber(1);

describe('FinalizeSto', () => {
  let target: FinalizeSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let simpleSto_3_0_0_Mock: MockManager<contractWrappersModule.CappedSTO_3_0_0>;
  let simpleSto_3_1_0_Mock: MockManager<contractWrappersModule.CappedSTO_3_1_0>;
  let tieredStoMock: MockManager<contractWrappersModule.USDTieredSTO_3_1_0>;

  // Mock factories
  let simpleStoFactoryMock: MockManager<simpleStoFactoryModule.SimpleStoFactory>;

  let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test FinalizeSto
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

    simpleStoFactoryMock = ImportMock.mockClass(simpleStoFactoryModule, 'SimpleStoFactory');

    tieredStoFactoryMock = ImportMock.mockClass(tieredStoFactoryModule, 'TieredStoFactory');

    factoryMockSetup = mockFactories();
    factoryMockSetup.simpleStoFactory = simpleStoFactoryMock.getMockInstance();
    factoryMockSetup.tieredStoFactory = tieredStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    tieredStoMock = ImportMock.mockClass(contractWrappersModule, 'USDTieredSTO_3_1_0');
    simpleSto_3_0_0_Mock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_0_0');
    simpleSto_3_1_0_Mock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_1_0');

    securityTokenId = SecurityToken.generateId({ symbol: simpleParams.symbol });

    moduleWrapperFactoryMock.mock('getModuleInstance', simpleSto_3_1_0_Mock.getMockInstance());

    simpleSto_3_1_0_Mock.mock(
      'getSTODetails',
      Promise.resolve({
        totalTokensSold: amountOfTokens,
        cap: new BigNumber(2),
      })
    );

    tieredStoMock.mock(
      'getSTODetails',
      Promise.resolve({
        tokensSold: amountOfTokens,
        capPerTier: [new BigNumber(2), new BigNumber(3)],
      })
    );

    simpleSto_3_1_0_Mock.mock('isFinalized', Promise.resolve(false));
    tieredStoMock.mock('isFinalized', Promise.resolve(false));

    wrappersMock.mock('getTreasuryWallet', Promise.resolve(treasuryWallet));

    // Instantiate FinalizeSto with a simple sto
    target = new FinalizeSto(simpleParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have FinalizeSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.FinalizeSto);
    });
  });

  describe('FinalizeSto', () => {
    test('should add the transaction to the queue to finalize a simple sto with version 3_1_0', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleSto_3_1_0_Mock.mock('finalize', Promise.resolve('Finalize'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(simpleSto_3_1_0_Mock.getMockInstance().finalize)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.FinalizeSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to finalize a tiered sto', async () => {
      target = new FinalizeSto(tieredParams, contextMock.getMockInstance());

      moduleWrapperFactoryMock.mock('getModuleInstance', tieredStoMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredStoMock.mock('finalize', Promise.resolve('Finalize'));

      // Real call
      await target.prepareTransactions();

      // Verifications\
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredStoMock.getMockInstance().finalize)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.FinalizeSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw an error if the simple sto has not been launched or is archived', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', Promise.resolve(undefined));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `STO ${simpleParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test('should throw an error if the tiered sto has not been launched or is archived', async () => {
      target = new FinalizeSto(tieredParams, contextMock.getMockInstance());

      moduleWrapperFactoryMock.mock('getModuleInstance', Promise.resolve(undefined));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `STO ${tieredParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new FinalizeSto(
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

    test('should throw if there is an invalid sto type', async () => {
      target = new FinalizeSto(
        {
          ...simpleParams,
          stoType: invalidSto as StoType,
        },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Invalid STO type ${invalidSto}`,
        })
      );
    });

    test('should throw an error if the sto is already finalized', async () => {
      simpleSto_3_1_0_Mock.mock('isFinalized', Promise.resolve(true));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `STO ${simpleParams.stoAddress} has already been finalized`,
        })
      );
    });

    test('should throw error if the simple sto version is 3_0_0', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', simpleSto_3_0_0_Mock.getMockInstance());
      simpleSto_3_0_0_Mock.set('contractVersion', ContractVersion.V3_0_0);

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.IncorrectVersion,
          message:
            'Capped STO version is 3.0.0. Version 3.1.0 or greater is required for forced finalization',
        })
      );
    });

    // This test will change once canTransfer is refactored in project
    test('should throw an error if can transfer returns null', async () => {
      securityTokenMock.mock('canTransfer', Promise.resolve(undefined));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Treasury wallet "${treasuryWallet}" is not cleared to receive the remaining ${amountOfTokens} "${
            simpleParams.symbol
          }" tokens. Please review transfer restrictions regarding this wallet address before attempting to finalize the STO`,
        })
      );
    });

    test('should successfully refresh the simple sto factory in its resolver method', async () => {
      const refreshStub = simpleStoFactoryMock.mock('refresh', Promise.resolve());
      await finalizeStoModule.createRefreshStoFactoryResolver(
        factoryMockSetup,
        simpleParams.symbol,
        simpleParams.stoType,
        simpleParams.stoAddress
      )();
      expect(
        refreshStub.getCall(0).calledWithExactly(
          SimpleSto.generateId({
            securityTokenId,
            stoType: StoType.Simple,
            address: simpleParams.stoAddress,
          })
        )
      ).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });

    test('should successfully refresh the tiered sto factory in its resolver method', async () => {
      target = new FinalizeSto(tieredParams, contextMock.getMockInstance());
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      await finalizeStoModule.createRefreshStoFactoryResolver(
        factoryMockSetup,
        tieredParams.symbol,
        tieredParams.stoType,
        tieredParams.stoAddress
      )();
      expect(
        refreshStub.getCall(0).calledWithExactly(
          TieredSto.generateId({
            securityTokenId,
            stoType: StoType.Tiered,
            address: tieredParams.stoAddress,
          })
        )
      ).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
