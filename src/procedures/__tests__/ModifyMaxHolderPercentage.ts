/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { ModifyMaxHolderPercentage } from '../../procedures/ModifyMaxHolderPercentage';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ModifyMaxHolderPercentageProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';

const params: ModifyMaxHolderPercentageProcedureArgs = {
  symbol: 'TEST1',
  maxHolderPercentage: new BigNumber(30),
};

const securityTokenAddress = '0x2222222222222222222222222222222222222222';

describe('ModifyMaxHolderPercentage', () => {
  let target: ModifyMaxHolderPercentage;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let percentageTransferMock: MockManager<contractWrappersModule.PercentageTransferManager_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ModifyMaxHolderPercentage
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(securityTokenAddress));

    percentageTransferMock = ImportMock.mockClass(
      contractWrappersModule,
      'PercentageTransferManager_3_0_0'
    );

    wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([percentageTransferMock.getMockInstance()])
    );
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    // Instantiate ModifyMaxHolderPercentage
    target = new ModifyMaxHolderPercentage(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyMaxHolderPercentage type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyMaxHolderPercentage);
    });
  });

  describe('ModifyMaxHolderPercentage', () => {
    test('should add a transaction to the queue to modify max holder percentage', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      percentageTransferMock.mock(
        'changeHolderPercentage',
        Promise.resolve('ChangeHolderPercentage')
      );

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(percentageTransferMock.getMockInstance().changeHolderPercentage, {
            tag: PolyTransactionTag.ChangeHolderPercentage,
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

    test('should throw if the percentage ownership restrictions feature is not enabled', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must enable the PercentageOwnershipRestrictions Feature',
        })
      );
    });
  });
});
