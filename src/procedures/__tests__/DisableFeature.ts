/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { PolymathError } from '../../base/PolymathError';
import {
  DisableFeatureProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import * as contextModule from '../../base/Context';
import * as wrappersModule from '../../base/PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { DisableFeature } from '~/procedures';

const params: DisableFeatureProcedureArgs = {
  symbol: 'TEST1',
  moduleName: ModuleName.GeneralTransferManager,
};

const moduleAddress = '0x9999999999999999999999999999999999999999';

describe('DisableFeature', () => {
  let target: DisableFeature;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test DisableFeature
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.mock('getModuleAddressesByName', [moduleAddress]);

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    // Instantiate DisableFeature
    target = new DisableFeature(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have DisableFeature type', async () => {
      expect(target instanceof DisableFeature).toBe(true);
      expect(target.type).toBe(ProcedureType.DisableFeature);
    });
  });

  describe('DisableFeature', () => {
    test('should add the transaction to the queue to disable a feature (archiving the module)', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('archiveModule', Promise.resolve('ArchiveModule'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().archiveModule, {
            tag: PolyTransactionTag.DisableFeature,
          })
      ).toEqual(true);
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
  });
});
