import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { stub, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { EnableDividendManager } from '../EnableDividendManager';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, PolyTransactionTag, ProcedureType } from '../../types';

const params = {
  symbol: 'TEST1',
  storageWalletAddress: '0x5555555555555555555555555555555555555555',
};

const securityTokenAddress = '0x2222222222222222222222222222222222222222';
const moduleFactoryAddress = '0x3333333333333333333333333333333333333333';

describe('EnableDividendManagers', () => {
  let target: EnableDividendManager;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test EnableDividendManagers
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

    // Instantiate EnableDividendManager
    target = new EnableDividendManager(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have EnableDividendManager type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.EnableDividendManager);
    });
  });

  describe('EnableDividendManager', () => {
    test('should add a transaction to the queue to enable the dividend manager', async () => {
      const addModuleWithLabelArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      const { addModuleWithLabel } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(addModuleWithLabel).returns(addModuleWithLabelArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addModuleWithLabelArgsSpy.getCall(0).args[0]).toEqual({
        moduleName: ModuleName.ERC20DividendCheckpoint,
        address: moduleFactoryAddress,
        archived: false,
        data: {
          wallet: params.storageWalletAddress,
        },
      });
      expect(addModuleWithLabelArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().addModuleWithLabel, {
            tag: PolyTransactionTag.EnableDividends,
          })
      ).toEqual(true);
      expect(addTransactionStub.callCount).toEqual(1);
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
