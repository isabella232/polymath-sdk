import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { PauseSto } from '../../procedures/PauseSto';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, PauseStoProcedureArgs, ProcedureType, StoType } from '~/types';
import * as cappedStoFactoryModule from '~/entities/factories/CappedStoFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '~/testUtils/mockFactories';

const usdTieredParams: PauseStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x6666666666666666666666666666666666666666',
  stoType: StoType.UsdTiered,
};

const cappedParams: PauseStoProcedureArgs = {
  symbol: 'TEST2',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stoType: StoType.Capped,
};

describe('PauseSto', () => {
  let target: PauseSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let cappedStoMock: MockManager<contractWrappersModule.CappedSTO_3_0_0>;
  let usdTieredStoMock: MockManager<contractWrappersModule.USDTieredSTO_3_0_0>;

  // Mock factories
  let cappedStoFactoryMock: MockManager<cappedStoFactoryModule.CappedStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test PauseSto
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

    moduleFactoryMock = ImportMock.mockClass(contractWrappersModule, 'ModuleFactory_3_0_0');

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    moduleWrapperFactoryMock.mock('getModuleInstance', moduleFactoryMock.getMockInstance());

    cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryModule, 'CappedStoFactory');

    const factoryMockSetup = mockFactories();
    factoryMockSetup.cappedStoFactory = cappedStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    usdTieredStoMock = ImportMock.mockClass(contractWrappersModule, 'USDTieredSTO_3_0_0');
    cappedStoMock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_0_0');

    // Instantiate PauseSto
    target = new PauseSto(cappedParams, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have PauseSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.PauseSto);
    });
  });

  describe('PauseSto', () => {
    test('should add the transaction to the queue to pause a capped sto', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(cappedStoMock.getMockInstance().pause)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to pause a usdTiered sto', async () => {
      target = new PauseSto(usdTieredParams, contextMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(usdTieredStoMock.getMockInstance().pause)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is no supplied valid security token', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        stub()
          .withArgs({ address: cappedParams.stoAddress })
          .throws()
      );

      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${cappedParams.symbol}`,
        })
      );
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new PauseSto(
        {
          stoAddress: 'invalid',
          symbol: cappedParams.symbol,
          stoType: cappedParams.stoType,
        },
        contextMock.getMockInstance()
      );
      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Invalid STO address invalid`,
        })
      );
    });

    test('should throw if there is an invalid sto type', async () => {
      target = new PauseSto(
        {
          stoAddress: cappedParams.stoAddress,
          symbol: cappedParams.symbol,
          stoType: {} as StoType,
        },
        contextMock.getMockInstance()
      );
      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Invalid STO type ${{}}`,
        })
      );
    });

    test('should throw if there is an invalid module instance returned', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', undefined);
      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${cappedParams.stoAddress} is either archived or hasn't been launched.`,
        })
      );
    });
  });
});
