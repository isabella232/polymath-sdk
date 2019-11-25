import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { PauseSto } from '../../procedures/PauseSto';
import { Procedure } from '../../procedures/Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  PauseStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as pauseStoModule from '../../procedures/PauseSto';
import * as cappedStoFactoryModule from '../../entities/factories/CappedStoFactory';
import * as usdTieredStoFactoryModule from '../../entities/factories/UsdTieredStoFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { CappedSto, SecurityToken, UsdTieredSto } from '../../entities';

const usdTieredParams: PauseStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x6666666666666666666666666666666666666666',
  stoType: StoType.UsdTiered,
};

const cappedParams: PauseStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stoType: StoType.Capped,
};

const invalidSto = 'InvalidSto';

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

  let usdTieredStoFactoryMock: MockManager<usdTieredStoFactoryModule.UsdTieredStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;

  beforeEach(() => {
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

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryModule, 'CappedStoFactory');

    usdTieredStoFactoryMock = ImportMock.mockClass(
      usdTieredStoFactoryModule,
      'UsdTieredStoFactory'
    );

    factoryMockSetup = mockFactories();
    factoryMockSetup.cappedStoFactory = cappedStoFactoryMock.getMockInstance();
    factoryMockSetup.usdTieredStoFactory = usdTieredStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    usdTieredStoMock = ImportMock.mockClass(contractWrappersModule, 'USDTieredSTO_3_0_0');
    cappedStoMock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_0_0');

    securityTokenId = SecurityToken.generateId({ symbol: cappedParams.symbol });

    moduleWrapperFactoryMock.mock('getModuleInstance', cappedStoMock.getMockInstance());

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
      cappedStoMock.mock('pause', Promise.resolve('Pause'));

      // Real call
      await target.prepareTransactions();

      // Verifications\
      expect(
        addTransactionSpy.getCall(0).calledWith(cappedStoMock.getMockInstance().pause)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.PauseSto);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to pause a usdTiered sto', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', usdTieredStoMock.getMockInstance());
      target = new PauseSto(usdTieredParams, contextMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');
      usdTieredStoMock.mock('pause', Promise.resolve('Pause'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(usdTieredStoMock.getMockInstance().pause)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.PauseSto);
      expect(addTransactionSpy.callCount).toEqual(1);
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
      await expect(target.prepareTransactions()).rejects.toThrow(
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

    test('should throw if there is an invalid module instance returned', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', undefined);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${cappedParams.stoAddress} is either archived or hasn't been launched.`,
        })
      );
    });

    test('should successfully resolve pause sto with capped sto params', async () => {
      const refreshStub = cappedStoFactoryMock.mock('refresh', Promise.resolve());
      await pauseStoModule.createPauseStoResolver(
        factoryMockSetup,
        cappedParams.symbol,
        cappedParams.stoType,
        cappedParams.stoAddress
      )();
      expect(
        refreshStub.getCall(0).calledWithExactly(
          CappedSto.generateId({
            securityTokenId,
            stoType: StoType.Capped,
            address: cappedParams.stoAddress,
          })
        )
      ).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });

    test('should successfully resolve pause sto with usd tiered sto params', async () => {
      target = new PauseSto(usdTieredParams, contextMock.getMockInstance());
      const refreshStub = usdTieredStoFactoryMock.mock('refresh', Promise.resolve());
      await pauseStoModule.createPauseStoResolver(
        factoryMockSetup,
        usdTieredParams.symbol,
        usdTieredParams.stoType,
        usdTieredParams.stoAddress
      )();
      expect(
        refreshStub.getCall(0).calledWithExactly(
          UsdTieredSto.generateId({
            securityTokenId,
            stoType: StoType.UsdTiered,
            address: usdTieredParams.stoAddress,
          })
        )
      ).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
