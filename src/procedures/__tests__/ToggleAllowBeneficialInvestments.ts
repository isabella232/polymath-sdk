import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ToggleAllowBeneficialInvestments } from '../ToggleAllowBeneficialInvestments';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  ToggleAllowBeneficialInvestmentsProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as toggleAllowBeneficalInvestmentsModule from '../ToggleAllowBeneficialInvestments';
import * as simpleStoFactoryModule from '../../entities/factories/SimpleStoFactory';
import * as tieredStoFactoryModule from '../../entities/factories/TieredStoFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { SimpleSto, SecurityToken, TieredSto } from '../../entities';

const tieredParams: ToggleAllowBeneficialInvestmentsProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x6666666666666666666666666666666666666666',
  stoType: StoType.Tiered,
  allowBeneficialInvestments: true,
};

const simpleParams: ToggleAllowBeneficialInvestmentsProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stoType: StoType.Simple,
  allowBeneficialInvestments: true,
};

const invalidSto = 'InvalidSto';

describe('ToggleAllowBeneficialInvestments', () => {
  let target: ToggleAllowBeneficialInvestments;
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
    // Mock the context, wrappers, and tokenFactory to test toggle beneficial investments
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

    tieredStoMock.mock('allowBeneficialInvestments', Promise.resolve(false));
    simpleStoMock.mock('allowBeneficialInvestments', Promise.resolve(false));

    securityTokenId = SecurityToken.generateId({ symbol: simpleParams.symbol });

    moduleWrapperFactoryMock.mock('getModuleInstance', simpleStoMock.getMockInstance());

    // Instantiate ToggleAllowBeneficialInvestments
    target = new ToggleAllowBeneficialInvestments(simpleParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ToggleAllowBeneficialInvestments type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ToggleAllowBeneficialInvestments);
    });
  });

  describe('ToggleAllowBeneficialInvestments', () => {
    test('should add the transaction to the queue to toggle allowed beneficial investments in a simple sto', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleStoMock.mock(
        'changeAllowBeneficialInvestments',
        Promise.resolve('ChangeAllowBeneficialInvestments')
      );

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(simpleStoMock.getMockInstance().changeAllowBeneficialInvestments)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ChangeAllowBeneficialInvestments
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to toggle beneficial investments in a tiered sto', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredStoMock.getMockInstance());
      target = new ToggleAllowBeneficialInvestments(tieredParams, contextMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredStoMock.mock(
        'changeAllowBeneficialInvestments',
        Promise.resolve('ChangeAllowBeneficialInvestments')
      );

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredStoMock.getMockInstance().changeAllowBeneficialInvestments)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ChangeAllowBeneficialInvestments
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new ToggleAllowBeneficialInvestments(
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

    test('should throw if trying to disallow beneficial investments', async () => {
      target = new ToggleAllowBeneficialInvestments(
        {
          ...simpleParams,
          allowBeneficialInvestments: false,
        },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Beneficial investments are already disallowed`,
        })
      );
    });

    test('should throw if beneficial investments are already allowed', async () => {
      simpleStoMock.mock('allowBeneficialInvestments', Promise.resolve(true));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Beneficial investments are already allowed`,
        })
      );
    });

    test('should throw if there is an invalid sto type', async () => {
      target = new ToggleAllowBeneficialInvestments(
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

    test('should successfully create toggleAllowBeneficialInvestments resolver with simple sto params', async () => {
      const refreshStub = simpleStoFactoryMock.mock('refresh', Promise.resolve());
      await toggleAllowBeneficalInvestmentsModule.createToggleAllowBeneficialInvestmentsResolver(
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

    test('should successfully create toggleAllowBeneficialInvestments resolver with tiered sto params', async () => {
      target = new ToggleAllowBeneficialInvestments(tieredParams, contextMock.getMockInstance());
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      await toggleAllowBeneficalInvestmentsModule.createToggleAllowBeneficialInvestmentsResolver(
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
