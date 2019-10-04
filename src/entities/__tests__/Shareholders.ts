import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as contextObject from '../../Context';
import * as createCheckpointProcedure from '../../procedures/CreateCheckpoint';

import { Shareholders } from '~/entities/SecurityToken/Shareholders';
import { SubModule } from '~/entities/SecurityToken/SubModule';
import { SecurityToken } from '../SecurityToken';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('Shareholders', () => {
  let target: Shareholders;
  let createCheckpointMock: MockManager<createCheckpointProcedure.CreateCheckpoint>;

  beforeAll(() => {
    // Generate the mock for CreateCheckpoint
    createCheckpointMock = ImportMock.mockClass(createCheckpointProcedure, 'CreateCheckpoint');

    // Generate a mock for context, and a security token to instantiate Shareholders
    const contextMock = ImportMock.mockClass(contextObject, 'Context');
    const st1 = new SecurityToken(params1, contextMock.getMockInstance());

    // Instantiate Shareholders
    target = new Shareholders(st1, contextMock.getMockInstance());
  });

  describe('Types', () => {
    test('should extend Submodule', async () => {
      expect(target instanceof SubModule).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      // Setup the mock on prepare
      const prepareCreateCheckpointMock = createCheckpointMock.mock('prepare', {});

      // Real call
      await target.createCheckpoint();

      // Verifications
      expect(sinon.spy(target, 'createCheckpoint').calledOnce);
      expect(prepareCreateCheckpointMock.calledOnce);
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
