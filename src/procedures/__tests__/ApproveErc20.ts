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

const params1 = {
  amount: new BigNumber(1),
  spender: '0x1',
  owner: '0x3',
};

describe('ApproveErc20', () => {
  let target: ApproveErc20;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<polymathBaseObject.PolymathBase>;
  let erc20Mock: MockManager<contractWrappersObject.ERC20>;
  let wrapperMockStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context and wrappers, including currentWallet and balanceOf to test ApproveErc20
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(polymathBaseObject, 'PolymathBase');
    erc20Mock = ImportMock.mockClass(contractWrappersObject, 'ERC20');
    erc20Mock.mock('balanceOf', Promise.resolve(params1.amount));
    wrapperMockStub = wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve();
    });
    contextMock.set('currentWallet', new Wallet({ address: () => ownerPromise }));

    // Instantiate ApproveErc20
    target = new ApproveErc20(params1, contextMock.getMockInstance());
  });

  describe('Types', () => {
    test('should extend procedure and have ApproveErc20 type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('ApproveErc20');
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
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
