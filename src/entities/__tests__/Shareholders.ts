import { Context } from '~/Context';
import { instance, mock, when } from 'ts-mockito';
import { SecurityToken } from '../SecurityToken';
import { Shareholders } from '~/entities/SecurityToken/Shareholders';
import { SubModule } from '~/entities/SecurityToken/SubModule';

import { CreateCheckpoint } from '../../procedures/CreateCheckpoint';

// This mock must be prefixed with "mock" to work, i.e. mockName
const mockPrepare = jest.fn();
jest.mock('../../procedures/CreateCheckpoint', () => ({
  CreateCheckpoint: jest.fn(() => ({
    prepare: mockPrepare,
  })),
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
    test('should extend Submodule', async () => {
      expect(target instanceof SubModule).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      // Real call
      await target.createCheckpoint();

      // Verifications
      spyOn(target, 'createCheckpoint').wasCalled;
      expect(CreateCheckpoint).toHaveBeenCalledTimes(1);
      expect(mockPrepare).toHaveBeenCalledTimes(1);
    });
  });

  /*
  // Original test we created here, saving it as a comment as it is useful to test
  // use of wrappers in procedures afterwards.
  describe('createCheckpoint', () => {
    beforeAll(() => {
      MockPolymathBase = mock(PolymathBase);
      polymathBase = instance(MockPolymathBase);

      MockedSecurityTokenContract = mock(SecurityToken_3_0_0);
      myContractPromise = Promise.resolve(
        instance(MockedSecurityTokenContract)
      );
      MockedTokenFactory = mock(MockedTokenFactory);

      const context = new Context({
        contractWrappers: polymathBase,
      });
      target = new SecurityToken(params1, context);
    });

    test('should send the transaction to createCheckpoint', async () => {
      when(MockPolymathBase.tokenFactory).thenReturn(
        instance(MockedTokenFactory)
      );
      when(
        MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)
      ).thenReturn(myContractPromise);

      // Stub the method

      when(MockedSecurityTokenContract.createCheckpoint).thenReturn(
        getMockedPolyResponse
      );

      // Real call
      const result = await target.shareholders.createCheckpoint();

      // Result expectation
      // Expect needs a mock of transaction queue
      //expect(result).toBe();
      // Verifications
      verify(MockPolymathBase.tokenFactory).once();
      verify(
        MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)
      ).once();
      verify(MockedSecurityTokenContract.createCheckpoint).once();
    });
  });
  */
});
