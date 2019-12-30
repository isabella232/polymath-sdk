import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { ModifyMaxHolderCount } from '../../procedures/ModifyMaxHolderCount';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ModifyMaxHolderCountProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';

const params: ModifyMaxHolderCountProcedureArgs = {
  symbol: 'TEST1',
  maxHolderCount: 3,
};

const securityTokenAddress = '0x2222222222222222222222222222222222222222';

describe('ModifyMaxHolderCount', () => {
  let target: ModifyMaxHolderCount;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let countTransferMock: MockManager<contractWrappersModule.CountTransferManager_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ModifyMaxHolderCount
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(securityTokenAddress));

    countTransferMock = ImportMock.mockClass(contractWrappersModule, 'CountTransferManager_3_0_0');

    wrappersMock.mock('getAttachedModules', Promise.resolve([countTransferMock.getMockInstance()]));
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    // Instantiate ModifyMaxHolderCount
    target = new ModifyMaxHolderCount(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyMaxHolderCount type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyMaxHolderCount);
    });
  });

  describe('ModifyMaxHolderCount', () => {
    test('should add a transaction to the queue to modify max holder count', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      countTransferMock.mock('changeHolderCount', Promise.resolve('ChangeHolderCount'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(countTransferMock.getMockInstance().changeHolderCount, {
            tag: PolyTransactionTag.ChangeHolderCount,
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

    test('should throw if the shareholder count restrictions feature is not enabled', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must enable the ShareholderCountRestrictions Feature',
        })
      );
    });
  });
});
