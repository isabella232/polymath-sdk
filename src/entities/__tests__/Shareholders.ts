import { Context } from '~/Context';
import { SecurityToken_3_0_0 } from '@polymathnetwork/contract-wrappers';
import { instance, mock, reset, when, verify } from 'ts-mockito';
import { PolymathBase } from '~/PolymathBase';
import { Entity } from '~/entities';
import { getMockedPolyResponse, MockedCallMethod, MockedSendMethod } from '~/testUtils';
import { Params, SecurityToken, UniqueIdentifiers } from '../SecurityToken';
import { MockedTokenFactoryObject } from '~/testUtils/MockedTokenFactoryObject';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('Shareholders', () => {
  let target: SecurityToken;
  let MockedSecurityTokenContract: SecurityToken_3_0_0;
  let polymathBase: PolymathBase;
  let myContractPromise: Promise<SecurityToken_3_0_0>;
  let MockedTokenFactory: MockedTokenFactoryObject;
  let MockPolymathBase: PolymathBase;

  beforeAll(() => {
    MockPolymathBase = mock(PolymathBase);
    polymathBase = instance(MockPolymathBase);

    MockedSecurityTokenContract = mock(SecurityToken_3_0_0);
    myContractPromise = Promise.resolve(instance(MockedSecurityTokenContract));
    MockedTokenFactory = mock(MockedTokenFactory);

    const context = new Context({
      contractWrappers: polymathBase,
    });
    target = new SecurityToken(params1, context);
  });
  afterAll(() => {
    reset(MockedSecurityTokenContract);
    reset(MockPolymathBase);
    reset(MockedTokenFactory);
  });

  describe('Types', () => {
    test('should extend Entity', async () => {
      expect(target instanceof Entity).toBe(true);
    });
  });

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
      /*
      // Expect needs a mock of transaction queue
      expect(result).toBe();
      */

      // Verifications
      verify(MockPolymathBase.tokenFactory).once();
      verify(MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)).once();
      verify(MockedSecurityTokenContract.createCheckpoint).once();
    });
  });
});
