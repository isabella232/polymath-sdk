import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contextObject from '../../Context';
import * as polymathBaseObject from '../../PolymathBase';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import { ApproveErc20 } from '../../procedures/ApproveErc20';
import { Procedure } from '~/procedures/Procedure';
import BigNumber from 'bignumber.js';
import { Wallet } from '~/Wallet';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '~/types';

const params1 = {
  amount: new BigNumber(1),
  spender: '0x1',
  owner: '0x3',
};

const params2 = {
  amount: new BigNumber(1),
  spender: '0x1',
  owner: '0x3',
  tokenAddress: '0x2222222222222222222222222222222222222222',
};

describe('ApproveErc20', () => {
  let target: ApproveErc20;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<polymathBaseObject.PolymathBase>;
  let erc20Mock: MockManager<contractWrappersObject.ERC20>;
  let polyTokenMock: MockManager<contractWrappersObject.PolyToken>;

  let checkPolyAllowanceStub: SinonStub<any, any>;
  let checkPolyAddressStub: SinonStub<any, any>;
  let checkPolyBalanceStub: SinonStub<any, any>;

  let checkErc20AllowanceStub: SinonStub<any, any>;
  let checkErc20AddressStub: SinonStub<any, any>;
  let checkErc20BalanceStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context and wrappers, including currentWallet and balanceOf to test ApproveErc20
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(polymathBaseObject, 'PolymathBase');
    erc20Mock = ImportMock.mockClass(contractWrappersObject, 'ERC20');
    polyTokenMock = ImportMock.mockClass(contractWrappersObject, 'PolyToken');

    // Setup poly token
    checkPolyBalanceStub = polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
    checkPolyAddressStub = polyTokenMock.mock('address', Promise.resolve(params1.spender));
    checkPolyAllowanceStub = polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));
    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve();
    });
    contextMock.set('currentWallet', new Wallet({ address: () => ownerPromise }));
  });

  describe('Types', () => {
    test('should extend procedure and have ApproveErc20 type', async () => {
      // Instantiate ApproveErc20
      target = new ApproveErc20(params1, contextMock.getMockInstance());
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('ApproveErc20');
    });
  });

  describe('ApproveErc20', () => {
    test('should send the transaction to ApproveErc20 with a poly token', async () => {
      // Instantiate ApproveErc20
      target = new ApproveErc20(params1, contextMock.getMockInstance());

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(checkPolyBalanceStub().calledOnce);
      expect(checkPolyAllowanceStub().calledOnce);
      expect(checkPolyAddressStub().calledOnce);
    });

    test('should send the transaction to createCheckpoint with a custom erc20 token', async () => {
      // Used by custom erc20 token
      checkErc20BalanceStub = erc20Mock.mock('balanceOf', Promise.resolve(params2.amount));
      checkErc20AddressStub = erc20Mock.mock('address', Promise.resolve(params2.spender));
      checkErc20AllowanceStub = erc20Mock.mock('allowance', Promise.resolve(new BigNumber(0)));

      const wrapperMockStub = wrappersMock.mock(
        'getERC20TokenWrapper',
        erc20Mock.getMockInstance()
      );
      // Instantiate ApproveErc20
      target = new ApproveErc20(params2, contextMock.getMockInstance());
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(wrapperMockStub().calledOnce);
      expect(checkErc20BalanceStub().calledOnce);
      expect(checkErc20AllowanceStub().calledOnce);
      expect(checkErc20AddressStub().calledOnce);
    });

    test('should fail with not enough funds error thrown ', async () => {
      // Setup test situation
      const zeroBalanceOf = new BigNumber(0);
      checkPolyBalanceStub = polyTokenMock.mock('balanceOf', Promise.resolve(zeroBalanceOf));

      const wrapperMockStub = wrappersMock.mock(
        'getERC20TokenWrapper',
        erc20Mock.getMockInstance()
      );
      // Instantiate ApproveErc20
      target = new ApproveErc20(params1, contextMock.getMockInstance());
      // Real call
      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Not enough funds',
        })
      );

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(wrapperMockStub().calledOnce);
    });

    test('should use token faucet if the balanceOf is less than amount (with poly token)', async () => {
      // Setup test situation
      wrappersMock.mock('isTestnet', Promise.resolve(true));
      const zeroBalanceOf = new BigNumber(0);
      checkPolyBalanceStub = polyTokenMock.mock('balanceOf', Promise.resolve(zeroBalanceOf));

      const wrapperMockStub = wrappersMock.mock(
        'getERC20TokenWrapper',
        erc20Mock.getMockInstance()
      );
      // Instantiate ApproveErc20
      target = new ApproveErc20(params1, contextMock.getMockInstance());
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(wrapperMockStub().calledOnce);
    });
  });
});
