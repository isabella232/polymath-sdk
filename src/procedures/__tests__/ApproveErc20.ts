import { ImportMock, MockManager } from 'ts-mock-imports';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import BigNumber from 'bignumber.js';
import { SinonStub, stub, spy } from 'sinon';
import * as contextModule from '../../Context';
import * as polymathBaseModule from '../../PolymathBase';
import { ApproveErc20 } from '../../procedures/ApproveErc20';
import { Procedure } from '~/procedures/Procedure';
import { Wallet } from '~/Wallet';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, PolyTransactionTag, ProcedureType } from '~/types';

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
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<polymathBaseModule.PolymathBase>;
  let erc20Mock: MockManager<contractWrappersModule.ERC20>;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;

  let checkPolyAllowanceStub: SinonStub<any, any>;
  let checkPolyAddressStub: SinonStub<any, any>;
  let checkPolyBalanceStub: SinonStub<any, any>;

  let checkErc20AllowanceStub: SinonStub<any, any>;
  let checkErc20AddressStub: SinonStub<any, any>;
  let checkErc20BalanceStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context and wrappers, including currentWallet and balanceOf to test ApproveErc20
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(polymathBaseModule, 'PolymathBase');
    erc20Mock = ImportMock.mockClass(contractWrappersModule, 'ERC20');
    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');

    // Setup poly token
    checkPolyBalanceStub = polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
    checkPolyAddressStub = polyTokenMock.mock('address', Promise.resolve(params1.spender));
    checkPolyAllowanceStub = polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));
    wrappersMock.mock(
      'getPolyTokens',
      Promise.resolve({
        receiptAsync: Promise.resolve([]),
      })
    );
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(params1.owner) }));
  });

  describe('Types', () => {
    test('should extend procedure and have ApproveErc20 type', async () => {
      // Instantiate ApproveErc20
      target = new ApproveErc20(params1, contextMock.getMockInstance());
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ApproveErc20);
    });
  });

  test('should throw if supplied address does not correspond to erc20 token', async () => {
    wrappersMock.set(
      'getERC20TokenWrapper',
      stub()
        .withArgs({ address: params2.tokenAddress })
        .throws()
    );
    // Instantiate ApproveErc20
    target = new ApproveErc20(params2, contextMock.getMockInstance());

    expect(target.prepareTransactions()).rejects.toThrow(
      new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'The supplied address does not correspond to an ERC20 token',
      })
    );
  });

  test('should send the transaction to ApproveErc20 with a poly token', async () => {
    // Instantiate ApproveErc20
    target = new ApproveErc20(params1, contextMock.getMockInstance());

    const addTransactionSpy = spy(target, 'addTransaction');

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

  test('should send the transaction to approve custom erc20 token', async () => {
    // Used by custom erc20 token
    checkErc20BalanceStub = erc20Mock.mock('balanceOf', Promise.resolve(params2.amount));
    checkErc20AddressStub = erc20Mock.mock('address', Promise.resolve(params2.spender));
    checkErc20AllowanceStub = erc20Mock.mock('allowance', Promise.resolve(new BigNumber(0)));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    // Instantiate ApproveErc20
    target = new ApproveErc20(params2, contextMock.getMockInstance());

    const addTransactionSpy = spy(target, 'addTransaction');

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

  test("should throw an error if the wallet doesn't have enough funds to approve the required amount", async () => {
    // Setup test situation
    const zeroBalanceOf = new BigNumber(0);
    checkPolyBalanceStub = polyTokenMock.mock('balanceOf', Promise.resolve(zeroBalanceOf));

    const wrapperMockStub = wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    // Instantiate ApproveErc20
    target = new ApproveErc20(params1, contextMock.getMockInstance());
    // Real call
    expect(target.prepareTransactions()).rejects.toThrow(
      new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Not enough funds',
      })
    );
  });

  test('should use token faucet if the balanceOf is less than amount (with poly token), and it is on test net environment', async () => {
    // Setup test situation
    wrappersMock.mock('isTestnet', Promise.resolve(true));

    const zeroBalanceOf = new BigNumber(0);
    checkPolyBalanceStub = polyTokenMock.mock('balanceOf', Promise.resolve(zeroBalanceOf));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    // Instantiate ApproveErc20
    target = new ApproveErc20(params1, contextMock.getMockInstance());

    const addTransactionSpy = spy(target, 'addTransaction');

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

  test('should return if it has sufficient allowance', async () => {
    // Used by custom erc20 token
    checkErc20BalanceStub = erc20Mock.mock('balanceOf', Promise.resolve(params2.amount));
    checkErc20AddressStub = erc20Mock.mock('address', Promise.resolve(params2.spender));
    // Sufficient allowance passed in
    checkErc20AllowanceStub = erc20Mock.mock('allowance', Promise.resolve(new BigNumber(3)));

    const getErc20TokenWrapperStub = wrappersMock.mock(
      'getERC20TokenWrapper',
      erc20Mock.getMockInstance()
    );

    // Instantiate ApproveErc20
    target = new ApproveErc20(params2, contextMock.getMockInstance());

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
