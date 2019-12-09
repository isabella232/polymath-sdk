import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { EnableCountTransferManager } from '../../procedures/EnableCountTransferManager';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  EnableCountTransferManagerProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';

const params: EnableCountTransferManagerProcedureArgs = {
  symbol: 'TEST1',
  maxHolderCount: 3,
};

const securityTokenAddress = '0x2222222222222222222222222222222222222222';
const moduleFactoryAddress = '0x3333333333333333333333333333333333333333';

describe('EnableCountTransferManager', () => {
  let target: EnableCountTransferManager;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test EnableCountTransferManagers
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(securityTokenAddress));

    wrappersMock.mock('getModuleFactoryAddress', Promise.resolve(moduleFactoryAddress));
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    // Instantiate EnableCountTransferManagers
    target = new EnableCountTransferManager(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have EnableCountTransferManager type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.EnableCountTransferManager);
    });
  });

  describe('EnableCountTransferManager', () => {
    test('should add a transaction to the queue to enable count transfer manager', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().addModuleWithLabel, {
            tag: PolyTransactionTag.EnableCountTransferManager,
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
