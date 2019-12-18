import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TogglePauseSto } from '../TogglePauseSto';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  TogglePauseStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as pauseStoModule from '../TogglePauseSto';
import * as simpleStoFactoryModule from '../../entities/factories/SimpleStoFactory';
import * as tieredStoFactoryModule from '../../entities/factories/TieredStoFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { SimpleSto, SecurityToken, TieredSto } from '../../entities';

const tieredParams: TogglePauseStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x6666666666666666666666666666666666666666',
  stoType: StoType.Tiered,
  pause: true,
};

const simpleParams: TogglePauseStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stoType: StoType.Simple,
  pause: true,
};

const invalidSto = 'InvalidSto';

describe('TogglePauseSto', () => {
  let target: TogglePauseSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let simpleStoMock: MockManager<contractWrappersModule.CappedSTO_3_0_0>;
  let tieredStoMock: MockManager<contractWrappersModule.USDTieredSTO_3_0_0>;

  // Mock factories
  let simpleStoFactoryMock: MockManager<simpleStoFactoryModule.SimpleStoFactory>;

  let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test PauseSto
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    moduleWrapperFactoryMock = ImportMock.mockClass(
      moduleWrapperFactoryModule,
      'MockedModuleWrapperFactoryModule'
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('moduleFactory', moduleWrapperFactoryMock.getMockInstance());

    simpleStoFactoryMock = ImportMock.mockClass(simpleStoFactoryModule, 'SimpleStoFactory');

    tieredStoFactoryMock = ImportMock.mockClass(tieredStoFactoryModule, 'TieredStoFactory');

    factoryMockSetup = mockFactories();
    factoryMockSetup.simpleStoFactory = simpleStoFactoryMock.getMockInstance();
    factoryMockSetup.tieredStoFactory = tieredStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    tieredStoMock = ImportMock.mockClass(contractWrappersModule, 'USDTieredSTO_3_0_0');
    simpleStoMock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_0_0');

    securityTokenId = SecurityToken.generateId({ symbol: simpleParams.symbol });

    moduleWrapperFactoryMock.mock('getModuleInstance', simpleStoMock.getMockInstance());

    // Instantiate TogglePauseSto
    target = new TogglePauseSto(simpleParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have TogglePauseSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.TogglePauseSto);
    });
  });

  describe('TogglePauseSto', () => {
    test('should add the transaction to the queue to pause a capped sto', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleStoMock.mock('pause', Promise.resolve('Pause'));

      // Real call
      await target.prepareTransactions();

      // Verifications\
      expect(
        addTransactionSpy.getCall(0).calledWith(simpleStoMock.getMockInstance().pause)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.PauseSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to unpause a capped sto', async () => {
      target = new TogglePauseSto(
        {
          ...simpleParams,
          pause: false,
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      simpleStoMock.mock('unpause', Promise.resolve('Unpause'));

      // Real call
      await target.prepareTransactions();

      // Verifications\
      expect(
        addTransactionSpy.getCall(0).calledWith(simpleStoMock.getMockInstance().unpause)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.UnpauseSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to pause a tiered sto', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredStoMock.getMockInstance());
      target = new TogglePauseSto(tieredParams, contextMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredStoMock.mock('pause', Promise.resolve('Pause'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredStoMock.getMockInstance().pause)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.PauseSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to unpause a tiered sto', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredStoMock.getMockInstance());
      target = new TogglePauseSto(
        {
          ...tieredParams,
          pause: false,
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredStoMock.mock('pause', Promise.resolve('Unpause'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredStoMock.getMockInstance().unpause)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.UnpauseSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new TogglePauseSto(
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

    test('should throw if there is an invalid sto type', async () => {
      target = new TogglePauseSto(
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

    test("should throw if the STO doesn't exist", async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', undefined);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${simpleParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test('should successfully resolve pause sto with capped sto params', async () => {
      const refreshStub = simpleStoFactoryMock.mock('refresh', Promise.resolve());
      await pauseStoModule.createTogglePauseStoResolver(
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

    test('should successfully resolve pause sto with usd tiered sto params', async () => {
      target = new TogglePauseSto(tieredParams, contextMock.getMockInstance());
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      await pauseStoModule.createTogglePauseStoResolver(
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
