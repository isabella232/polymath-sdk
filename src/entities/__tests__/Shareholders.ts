import { Params, SecurityToken, UniqueIdentifiers } from '../SecurityToken';
import { Context } from '~/Context';
import { SecurityToken_3_0_0 } from '@polymathnetwork/contract-wrappers';
import { instance, mock, reset, when, verify } from 'ts-mockito';
import { PolymathBase } from '~/PolymathBase';
import { Web3ProviderEngine } from '@0x/subproviders';
import { Entity } from '~/entities';
import { getMockedPolyResponse, MockedCallMethod, MockedSendMethod } from '~/testUtils';

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
  let mockedPolymathBase: PolymathBase;
  let myContractPromise: Promise<SecurityToken_3_0_0>;

  beforeAll(() => {
    mockedContract = mock(SecurityToken_3_0_0);
    mockedPolymathBase = mock(PolymathBase);

    myContractPromise = Promise.resolve(instance(mockedContract));

    const provider = new Web3ProviderEngine();
    provider.start();
    const context = new Context({
      contractWrappers: mockedPolymathBase,
    });
    target = new FakeSecurityToken(params1, instance(context));
  });
  afterAll(() => {
    reset(mockedPolymathBase);
    reset(mockedContract);
  });

  describe('Types', () => {
    test('should extend Entity', async () => {
      expect(target instanceof Entity).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      when(
        mockedPolymathBase.tokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)
      ).thenReturn(myContractPromise);

      // Stub the method
      when(mockedContract.createCheckpoint).thenReturn(getMockedPolyResponse);

      // Real call
      const result = await target.shareholders.createCheckpoint();

      // Result expectation
      expect(result).toBe(getMockedPolyResponse());
      // Verifications
      verify(mockedContract.createCheckpoint).once();
      verify(
        mockedPolymathBase.tokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)
      ).once();
    });
  });
});
