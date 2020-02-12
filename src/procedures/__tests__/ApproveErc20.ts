/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { spy } from 'sinon';
import * as contextModule from '../../base/Context';
import * as polymathBaseModule from '../../base/PolymathBase';
import { ApproveErc20 } from '../../procedures/ApproveErc20';
import { Procedure } from '../../procedures/Procedure';
import { Wallet } from '../../base/Wallet';
import { PolymathError } from '../../base/PolymathError';
import { ErrorCode, PolyTransactionTag, ProcedureType } from '../../types';

const params = {
  amount: new BigNumber(1),
  spender: '0x1',
  owner: '0x3',
};

const tokenAddress = '0x2222222222222222222222222222222222222222';

describe('ApproveErc20', () => {
  let target: ApproveErc20;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<polymathBaseModule.PolymathBase>;
  let erc20Mock: MockManager<contractWrappersModule.ERC20>;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;

  beforeEach(() => {
    // Mock the context and wrappers, including currentWallet and balanceOf to test ApproveErc20
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(polymathBaseModule, 'PolymathBase');
    erc20Mock = ImportMock.mockClass(contractWrappersModule, 'ERC20');
    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');

    // Setup poly token
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
    polyTokenMock.mock('address', Promise.resolve(params.spender));
    polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));
    wrappersMock.mock(
      'getPolyTokens',
      Promise.resolve({
        receiptAsync: Promise.resolve([]),
      })
    );
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(params.owner) }));
  });

  describe('Types', () => {
    test('should extend procedure and have ApproveErc20 type', async () => {
      // Instantiate ApproveErc20
      target = new ApproveErc20(params, contextMock.getMockInstance());
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ApproveErc20);
    });
  });

  test('should throw if supplied address does not correspond to erc20 token', async () => {
    wrappersMock
      .mock('getERC20TokenWrapper')
      .withArgs({ address: tokenAddress })
      .throws();
    // Instantiate ApproveErc20
    target = new ApproveErc20({ ...params, tokenAddress }, contextMock.getMockInstance());

    await expect(target.prepareTransactions()).rejects.toThrow(
      new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'The supplied address does not correspond to an ERC20 token',
      })
    );
  });

  test('should add an approve transaction to the queue using the POLY token if no token address is supplied', async () => {
    // Instantiate ApproveErc20
    target = new ApproveErc20(params, contextMock.getMockInstance());

    const addTransactionSpy = spy(target, 'addTransaction');
    polyTokenMock.mock('approve', Promise.resolve('Approve'));

    // Real call
    await target.prepareTransactions();

    // Verifications
    expect(
      addTransactionSpy.getCall(0).calledWithExactly(polyTokenMock.getMockInstance().approve, {
        tag: PolyTransactionTag.ApproveErc20,
      })
    ).toEqual(true);
    expect(addTransactionSpy.callCount).toEqual(1);
  });

  test('should add an approve transaction to the queue using a custom ERC20 contract as a token address is supplied', async () => {
    // Used by custom erc20 token
    erc20Mock.mock('balanceOf', Promise.resolve(params.amount));
    erc20Mock.mock('address', Promise.resolve(params.spender));
    erc20Mock.mock('allowance', Promise.resolve(new BigNumber(0)));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    // Instantiate ApproveErc20
    target = new ApproveErc20({ ...params, tokenAddress }, contextMock.getMockInstance());

    const addTransactionSpy = spy(target, 'addTransaction');
    erc20Mock.mock('approve', Promise.resolve('Approve'));

    // Real call
    await target.prepareTransactions();

    // Verifications
    expect(
      addTransactionSpy.getCall(0).calledWithExactly(erc20Mock.getMockInstance().approve, {
        tag: PolyTransactionTag.ApproveErc20,
      })
    ).toEqual(true);
    expect(addTransactionSpy.callCount).toEqual(1);
  });

  test("should throw an error if the wallet doesn't have enough funds to approve the required amount", async () => {
    // Setup test situation
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(0)));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    // Instantiate ApproveErc20
    target = new ApproveErc20(params, contextMock.getMockInstance());
    // Real call
    await expect(target.prepareTransactions()).rejects.toThrow(
      new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Not enough funds',
      })
    );
  });

  test('should use token faucet if the balanceOf is less than amount (with poly token), and it is on test net environment', async () => {
    // Setup test situation
    wrappersMock.mock('isTestnet', Promise.resolve(true));

    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(0)));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    // Instantiate ApproveErc20
    target = new ApproveErc20(params, contextMock.getMockInstance());

    const addTransactionSpy = spy(target, 'addTransaction');
    polyTokenMock.mock('approve', Promise.resolve('Approve'));
    wrappersMock.mock('getPolyTokens', Promise.resolve('GetPolyTokens'));

    // Real call
    await target.prepareTransactions();

    // Verifications
    expect(
      addTransactionSpy.getCall(0).calledWithExactly(wrappersMock.getMockInstance().getPolyTokens, {
        tag: PolyTransactionTag.GetTokens,
      })
    ).toEqual(true);
    expect(
      addTransactionSpy.getCall(1).calledWithExactly(polyTokenMock.getMockInstance().approve, {
        tag: PolyTransactionTag.ApproveErc20,
      })
    ).toEqual(true);
    expect(addTransactionSpy.callCount).toEqual(2);
  });

  test('should return if it has sufficient allowance, will never add the transaction', async () => {
    // Used by custom erc20 token
    erc20Mock.mock('balanceOf', Promise.resolve(params.amount));
    erc20Mock.mock('address', Promise.resolve(params.spender));
    // Sufficient allowance passed in
    erc20Mock.mock('allowance', Promise.resolve(new BigNumber(3)));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());

    // Instantiate ApproveErc20
    target = new ApproveErc20({ ...params, tokenAddress }, contextMock.getMockInstance());

    // Real call
    await target.prepareTransactions();

    // Verifications
    expect(
      spy(target, 'addTransaction').neverCalledWith({
        tag: PolyTransactionTag.ApproveErc20,
      })
    );
  });
});
