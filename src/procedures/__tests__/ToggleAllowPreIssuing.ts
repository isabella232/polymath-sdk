/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ContractVersion } from '@polymathnetwork/contract-wrappers';
import { ToggleAllowPreIssuing } from '../ToggleAllowPreIssuing';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../base/PolymathError';
import {
  ErrorCode,
  ToggleAllowPreIssuingProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as toggleAllowPreIssuingModule from '../ToggleAllowPreIssuing';
import * as simpleStoFactoryModule from '../../entities/factories/SimpleStoFactory';
import * as tieredStoFactoryModule from '../../entities/factories/TieredStoFactory';
import * as contextModule from '../../base/Context';
import * as wrappersModule from '../../base/PolymathBase';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../base/Context';
import { SimpleSto, SecurityToken, TieredSto } from '../../entities';

const tieredParams: ToggleAllowPreIssuingProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x6666666666666666666666666666666666666666',
  stoType: StoType.Tiered,
  allowPreIssuing: true,
};

const simpleParams: ToggleAllowPreIssuingProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stoType: StoType.Simple,
  allowPreIssuing: true,
};

const invalidSto = 'InvalidSto';

describe('ToggleAllowPreIssuing', () => {
  let target: ToggleAllowPreIssuing;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let simpleSto_3_0_0_Mock: MockManager<contractWrappersModule.CappedSTO_3_0_0>;
  let tieredSto_3_0_0_Mock: MockManager<contractWrappersModule.USDTieredSTO_3_0_0>;

  let simpleSto_3_1_0_Mock: MockManager<contractWrappersModule.CappedSTO_3_1_0>;
  let tieredSto_3_1_0_Mock: MockManager<contractWrappersModule.USDTieredSTO_3_1_0>;

  // Mock factories
  let simpleStoFactoryMock: MockManager<simpleStoFactoryModule.SimpleStoFactory>;
  let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test allow pre issuing
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

    tieredSto_3_0_0_Mock = ImportMock.mockClass(contractWrappersModule, 'USDTieredSTO_3_0_0');
    tieredSto_3_1_0_Mock = ImportMock.mockClass(contractWrappersModule, 'USDTieredSTO_3_1_0');
    simpleSto_3_0_0_Mock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_0_0');
    simpleSto_3_1_0_Mock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_1_0');

    tieredSto_3_1_0_Mock.mock('preMintAllowed', Promise.resolve(false));
    simpleSto_3_1_0_Mock.mock('preMintAllowed', Promise.resolve(false));

    securityTokenId = SecurityToken.generateId({ symbol: simpleParams.symbol });

    moduleWrapperFactoryMock.mock('getModuleInstance', simpleSto_3_1_0_Mock.getMockInstance());

    // Instantiate ToggleAllowPreIssuing
    target = new ToggleAllowPreIssuing(simpleParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ToggleAllowPreIssuing type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ToggleAllowPreIssuing);
    });
  });

  describe('ToggleAllowPreIssuing', () => {
    test('should add the transaction to the queue to allow pre issuing in a simple sto', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleSto_3_1_0_Mock.mock('allowPreMinting', Promise.resolve('AllowPreMinting'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(simpleSto_3_1_0_Mock.getMockInstance().allowPreMinting)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.AllowPreMinting);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to revoke pre issuing in a simple sto', async () => {
      target = new ToggleAllowPreIssuing(
        { ...simpleParams, allowPreIssuing: false },
        contextMock.getMockInstance()
      );
      simpleSto_3_1_0_Mock.mock('preMintAllowed', Promise.resolve(true));
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleSto_3_1_0_Mock.mock('revokePreMintFlag', Promise.resolve('RevokePreMintFlag'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(simpleSto_3_1_0_Mock.getMockInstance().revokePreMintFlag)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.RevokePreMinting);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to allow pre issuing in a tiered sto', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredSto_3_1_0_Mock.getMockInstance());
      target = new ToggleAllowPreIssuing(tieredParams, contextMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('allowPreMinting', Promise.resolve('ChangeAllowPreIssuing'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().allowPreMinting)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.AllowPreMinting);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to revoke pre issuing in a tiered sto', async () => {
      target = new ToggleAllowPreIssuing(
        { ...tieredParams, allowPreIssuing: false },
        contextMock.getMockInstance()
      );
      simpleSto_3_1_0_Mock.mock('preMintAllowed', Promise.resolve(true));
      const addTransactionSpy = spy(target, 'addTransaction');
      simpleSto_3_1_0_Mock.mock('revokePreMintFlag', Promise.resolve('RevokePreMintFlag'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(simpleSto_3_1_0_Mock.getMockInstance().revokePreMintFlag)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.RevokePreMinting);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new ToggleAllowPreIssuing(
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

    test('should throw if trying to disallow pre issuing when pre issuing is already disallowed', async () => {
      target = new ToggleAllowPreIssuing(
        {
          ...simpleParams,
          allowPreIssuing: false,
        },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Pre-minting is already disallowed`,
        })
      );
    });

    test('should throw if trying to allow pre issuing when pre issuing is already allowed', async () => {
      simpleSto_3_1_0_Mock.mock('preMintAllowed', Promise.resolve(true));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Pre-minting is already allowed`,
        })
      );
    });

    test('should throw if there is an invalid sto type', async () => {
      target = new ToggleAllowPreIssuing(
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

    test("should throw if the simple STO doesn't exist", async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', undefined);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${simpleParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test("should throw if the tiered STO doesn't exist", async () => {
      target = new ToggleAllowPreIssuing(tieredParams, contextMock.getMockInstance());
      moduleWrapperFactoryMock.mock('getModuleInstance', undefined);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${tieredParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test('should throw error if the simple sto version is 3_0_0', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', simpleSto_3_0_0_Mock.getMockInstance());
      simpleSto_3_0_0_Mock.set('contractVersion', ContractVersion.V3_0_0);

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.IncorrectVersion,
          message: 'STO version is 3.0.0. Version 3.1.0 or greater is required for pre-minting',
        })
      );
    });

    test('should throw error if the tiered sto version is 3_0_0', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredSto_3_0_0_Mock.getMockInstance());
      tieredSto_3_0_0_Mock.set('contractVersion', ContractVersion.V3_0_0);

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.IncorrectVersion,
          message: 'STO version is 3.0.0. Version 3.1.0 or greater is required for pre-minting',
        })
      );
    });

    test('should refresh the simple STO', async () => {
      const refreshStub = simpleStoFactoryMock.mock('refresh', Promise.resolve());
      await toggleAllowPreIssuingModule.createToggleAllowPreIssuingResolver(
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

    test('should refresh the tiered STO', async () => {
      target = new ToggleAllowPreIssuing(tieredParams, contextMock.getMockInstance());
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      await toggleAllowPreIssuingModule.createToggleAllowPreIssuingResolver(
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
