import { Context } from '~/Context';
import { instance, mock, when } from 'ts-mockito';
import { SecurityToken } from '../SecurityToken';
import { Shareholders } from '~/entities/SecurityToken/Shareholders';

import CreateCheckpoint from '~/procedures/CreateCheckpoint';

import { SubModule } from '~/entities/SecurityToken/SubModule';

jest.mock('~/procedures/CreateCheckpoint', () => ({
  CreateCheckpoint: jest.fn(() => {
    jest.fn();
  }),
}));

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('Shareholders', () => {
  let target: Shareholders;

  beforeAll(() => {
    const contextMock = mock(Context);
    const SecurityTokenMock = mock(SecurityToken);
    when(SecurityTokenMock.uid).thenReturn('12345');
    when(SecurityTokenMock.symbol).thenReturn(params1.symbol);
    const stMock = instance(SecurityTokenMock);
    target = new Shareholders(stMock, contextMock);
  });

  describe('Types', () => {
    test('should extend Entity', async () => {
      expect(target instanceof SubModule).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      // Real call
      const result = await target.createCheckpoint();
      // Verifications
      expect(CreateCheckpoint).toHaveBeenCalledTimes(1);
    });
  });
  /*
  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      when(MockPolymathBase.tokenFactory).thenReturn(instance(MockedTokenFactory));
      when(MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)).thenReturn(
        myContractPromise
      );

      // Stub the method

      when(MockedSecurityTokenContract.createCheckpoint).thenReturn(getMockedPolyResponse);

      // Real call
      const result = await target.shareholders.createCheckpoint();

      // Result expectation
      // Expect needs a mock of transaction queue
      //expect(result).toBe();
      // Verifications
       verify(MockPolymathBase.tokenFactory).once();
      verify(MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)).once();
      verify(MockedSecurityTokenContract.createCheckpoint).once();
      });
    });
   */
});
