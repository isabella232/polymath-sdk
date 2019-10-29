import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contextModule from '../../Context';
import * as polymathBaseModule from '../../PolymathBase';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { ApproveErc20 } from '../../procedures/ApproveErc20';
import { Procedure } from '~/procedures/Procedure';
import { Wallet } from '~/Wallet';
import { ProcedureType } from '~/types';

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

  beforeAll(() => {
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

  describe('ApproveErc20', () => {
    test('should send the transaction to ApproveErc20 with a poly token', async () => {
      // Instantiate ApproveErc20
      target = new ApproveErc20(params1, contextMock.getMockInstance());

      // Real call
      await target.prepareTransactions();
    });
  });

  test('should send the transaction to createCheckpoint with a custom erc20 token', async () => {
    // Used by custom erc20 token
    checkErc20BalanceStub = erc20Mock.mock('balanceOf', Promise.resolve(params2.amount));
    checkErc20AddressStub = erc20Mock.mock('address', Promise.resolve(params2.spender));
    checkErc20AllowanceStub = erc20Mock.mock('allowance', Promise.resolve(new BigNumber(0)));

    const getErc20TokenWrapperStub = wrappersMock.mock(
      'getERC20TokenWrapper',
      erc20Mock.getMockInstance()
    );
    // Instantiate ApproveErc20
    target = new ApproveErc20(params2, contextMock.getMockInstance());
    // Real call
    await target.prepareTransactions();
  });
});
