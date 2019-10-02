import { Context } from '~/Context';
import { SecurityToken_3_0_0 } from '@polymathnetwork/contract-wrappers';
import { instance, mock, reset, when, verify } from 'ts-mockito';
import { PolymathBase } from '~/PolymathBase';
import { Entity } from '~/entities';
import { getMockedPolyResponse, MockedCallMethod, MockedSendMethod } from '~/testUtils';
import { MockedTokenFactory } from '~/testUtils/MockedTokenFactory';
import { Web3ProviderEngine } from '@0x/subproviders';
import { Params, SecurityToken, UniqueIdentifiers } from '../SecurityToken';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('Shareholders', () => {
  class FakeSecurityToken extends SecurityToken {
    public constructor(params: Params & UniqueIdentifiers, context: Context) {
      super(params, context);
    }
  }
  let target: FakeSecurityToken;
  let mockedContract: SecurityToken_3_0_0;
  let polymathBase: PolymathBase;
  let myContractPromise: Promise<SecurityToken_3_0_0>;
  let mockedTokenFactory: MockedTokenFactory;

  beforeAll(() => {
    const provider = new Web3ProviderEngine();
    provider.start();
    polymathBase = mock(new PolymathBase({ provider }));

    mockedContract = mock(SecurityToken_3_0_0);
    myContractPromise = Promise.resolve(instance(mockedContract));
    mockedTokenFactory = mock(MockedTokenFactory);

    const context = new Context({
      contractWrappers: polymathBase,
    });
    target = new FakeSecurityToken(params1, context);
  });
  afterAll(() => {
    reset(mockedContract);
    reset(mockedTokenFactory);
  });

  describe('Types', () => {
    test('should extend Entity', async () => {
      expect(target instanceof Entity).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      when(polymathBase.tokenFactory).thenReturn(mockedTokenFactory);
      when(mockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)).thenReturn(
        myContractPromise
      );

      // Stub the method
      when(mockedContract.createCheckpoint).thenReturn(getMockedPolyResponse);

      // Real call
      const result = await target.shareholders.createCheckpoint();

      // Result expectation
      expect(result).toBe(getMockedPolyResponse());
      // Verifications
      verify(mockedContract.createCheckpoint).once();
      verify(polymathBase.tokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)).once();
    });
  });
});
