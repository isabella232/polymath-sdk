/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { stub, restore } from 'sinon';
import {
  BigNumber,
  ModuleName,
  TransactionReceiptWithDecodedLogs,
} from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { EnablePercentageTransferManager } from '../../procedures/EnablePercentageTransferManager';
import * as enablePercentageTransferManagerModule from '../EnablePercentageTransferManager';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  EnablePercentageTransferManagerProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import * as utilsModule from '~/utils';

const params: EnablePercentageTransferManagerProcedureArgs = {
  symbol: 'TEST1',
  maxHolderPercentage: new BigNumber(50),
};

const securityTokenAddress = '0x2222222222222222222222222222222222222222';
const moduleFactoryAddress = '0x3333333333333333333333333333333333333333';

describe('EnablePercentageTransferManager', () => {
  let target: EnablePercentageTransferManager;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test EnablePercentageTransferManagers
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

    // Instantiate EnablePercentageTransferManagers
    target = new EnablePercentageTransferManager(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have EnablePercentageTransferManager type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.EnablePercentageTransferManager);
    });
  });

  describe('EnablePercentageTransferManager', () => {
    test('should add a transaction to the queue to enable percentage transfer manager', async () => {
      const addModuleWithLabelArgsStub = sinon.stub();
      addModuleWithLabelArgsStub.returns([{}]);

      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      const { addModuleWithLabel } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(addModuleWithLabel).returns(addModuleWithLabelArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addModuleWithLabelArgsStub.getCall(0).args[0]).toEqual({
        moduleName: ModuleName.PercentageTransferManager,
        address: moduleFactoryAddress,
        archived: false,
        data: {
          allowPrimaryIssuance: false,
          maxHolderPercentage: params.maxHolderPercentage,
        },
      });
      expect(addModuleWithLabelArgsStub.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.EnablePercentageTransferManager
      );
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to enable percentage transfer manager with primary issuance', async () => {
      target = new EnablePercentageTransferManager(
        { ...params, allowPrimaryIssuance: true },
        contextMock.getMockInstance()
      );
      const addModuleWithLabelArgsStub = sinon.stub();
      addModuleWithLabelArgsStub.returns([{}]);
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      const { addModuleWithLabel } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(addModuleWithLabel).returns(addModuleWithLabelArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addModuleWithLabelArgsStub.getCall(0).args[0]).toEqual({
        moduleName: ModuleName.PercentageTransferManager,
        address: moduleFactoryAddress,
        archived: false,
        data: {
          allowPrimaryIssuance: true,
          maxHolderPercentage: params.maxHolderPercentage,
        },
      });
      expect(addModuleWithLabelArgsStub.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.EnablePercentageTransferManager
      );
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should throw if whitelist parameter is defined but it is empty', async () => {
      target = new EnablePercentageTransferManager(
        { ...params, whitelistEntries: [] },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Whitelist data passed can not be an empty list`,
        })
      );
    });

    test('should throw if corresponding enable percentage transfer manager event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      await expect(
        enablePercentageTransferManagerModule.createPtmAddressResolver(
          {} as TransactionReceiptWithDecodedLogs
        )
      ).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Percentage Transfer Manager was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
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
