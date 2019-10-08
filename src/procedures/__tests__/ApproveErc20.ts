import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
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
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let wrapperMockStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context and wrappers, including currentWallet and balanceOf to test ApproveErc20
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    wrapperMockStub = wrappersMock.mock('getERC20TokenWrapper', {
      // This object needs to return balanceOf() for the 'token'
      balanceOf: params1.amount, // Need to correct syntax here?
    });
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve();
    });
    contextMock.set('currentWallet', new Wallet({ address: () => ownerPromise }));

    // Instantiate CreateCheckpoint
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
