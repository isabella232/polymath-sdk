import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as approveObject from '../ApproveErc20';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { CreateErc20DividendDistribution } from '../../procedures/CreateErc20DividendDistribution';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '~/types';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  erc20Address: '0x1',
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
};

describe('CreateErc20DividendDistribution', () => {
  let target: CreateErc20DividendDistribution;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let approvalMock: MockManager<approveObject.ApproveErc20>;
  let tokenFactoryMock: MockManager<tokenFactoryObject.MockedTokenFactoryObject>;
  let gpmMock: MockManager<contractWrappersObject.GeneralPermissionManager_3_0_0>;
  let erc20DividendsMock: MockManager<contractWrappersObject.ERC20DividendCheckpoint_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateErc20DividendDistribution
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryObject, 'MockedTokenFactoryObject');

    // Import mock out of ApproveErc20
    approvalMock = ImportMock.mockClass(approveObject, 'ApproveErc20');
    approvalMock.mock('prepareTransactions', Promise.resolve());
    approvalMock.set('transactions' as any, []);
    approvalMock.set('fees' as any, []);

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersObject, 'GeneralPermissionManager_3_0_0');
    erc20DividendsMock = ImportMock.mockClass(
      contractWrappersObject,
      'ERC20DividendCheckpoint_3_0_0'
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});
    erc20DividendsMock.mock('address', Promise.resolve(params1.erc20Address));
    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([erc20DividendsMock.getMockInstance()])
    );

    // Instantiate CreateErc20DividendDistribution
    target = new CreateErc20DividendDistribution(
      {
        symbol: params1.symbol,
        maturityDate: params1.maturityDate,
        expiryDate: params1.expiryDate,
        erc20Address: params1.erc20Address,
        amount: params1.amount,
        checkpointIndex: params1.checkpointIndex,
        name: params1.name,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have CreateErc20DividendDistribution type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('CreateErc20DividendDistribution');
    });
  });

  describe('CreateErc20DividendDistribution', () => {
    test('should send the transaction to CreateErc20DividendDistribution', async () => {
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(getAttachedModulesMockStub().calledOnce);
      expect(tokenFactoryMockStub().calledOnce);
    });

    test('should throw error if the erc20 dividends manager has not been enabled', async () => {
      getAttachedModulesMockStub = wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The ERC20 Dividends Manager hasn't been enabled",
        })
      );
    });
  });
});
