import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
import { Procedure } from '~/procedures/Procedure';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1111111111111111111111111111111111111111',
  owner: '0x3333333333333333333333333333333333333333',
  amount: new BigNumber(1),
};

describe('ControllerTransfer', () => {
  let target: ControllerTransfer;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryObject.MockedTokenFactoryObject>;
  let tokenFactoryMockStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateCheckpoint
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryObject, 'MockedTokenFactoryObject');

    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    // Instantiate ControllerTransfer
    target = new ControllerTransfer(
      {
        from: params1.address,
        to: params1.owner,
        amount: params1.amount,
        symbol: params1.symbol,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have ControllerTransfer type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('ControllerTransfer');
    });
  });

  describe('ControllerTransfer', () => {
    test('should send the transaction to ControllerTransfer', async () => {
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(tokenFactoryMockStub().calledOnce);
    });
  });
});
