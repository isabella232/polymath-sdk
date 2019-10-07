import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';

import { Shareholders } from '~/entities/SecurityToken/Shareholders';
import { CreateCheckpoint } from '../../procedures/CreateCheckpoint';
import { Procedure } from '~/procedures/Procedure';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('Shareholders', () => {
  let target: CreateCheckpoint;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryObject.MockedTokenFactoryObject>;

  beforeAll(() => {
    // Generate a mock for context, and a security token to instantiate Shareholders
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryObject, 'MockedTokenFactoryObject');

    // Instantiate CreateCheckpoint
    target = new CreateCheckpoint(
      {
        symbol: params1.symbol,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend Submodule', async () => {
      expect(target instanceof Procedure).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      const getSecurityTokenMock = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});
      const wrappersMockObject = contextMock.mock('contractWrappers', wrappersMock);
      const tokenFactoryMockObject = wrappersMock.mock('tokenFactory', tokenFactoryMock);

      // Real call
      await target.prepareTransactions();

      // Verifications
      //  expect(sinon.spy(target, 'prep').calledOnce);
      expect(getSecurityTokenMock.calledOnce);
    });
  });

  /*
  // Original test we created here, saving it as a comment as it is useful to test
  // use of wrappers in procedures afterwards. Completed with ts-mockito
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
