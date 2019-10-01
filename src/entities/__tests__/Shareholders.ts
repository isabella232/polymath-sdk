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

  beforeAll(() => {
    mockedContract = mock(SecurityToken_3_0_0);
    mockedPolymathBase = mock(PolymathBase);

    const myContractPromise = Promise.resolve(instance(mockedContract));

    const provider = new Web3ProviderEngine();
    provider.start();
    const context = new Context({
      contractWrappers: mockedPolymathBase,
    });
    target = new SecurityToken(params1, instance(context));
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
  /*
  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      // Mocked parameters
      const mockedParams = {
        txData: {},
        safetyFactor: 10,
      };
      const expectedResult = getMockedPolyResponse();
      // Mocked method
      const mockedMethod = mock(MockedSendMethod);
      // Stub the method
      when(mockedContract.createCheckpoint).thenReturn(instance(mockedMethod));
      // Stub the request
      when(mockedMethod.sendTransactionAsync(mockedParams.txData, mockedParams.safetyFactor)).thenResolve(
        expectedResult,
      );

      // Real call
      const result = await target.shareholders.createCheckpoint();

      // Result expectation
      expect(result).toBe(expectedResult);
      // Verifications
      verify(mockedContract.createCheckpoint).once();
      verify(mockedMethod.sendTransactionAsync(mockedParams.txData, mockedParams.safetyFactor)).once();
    });
  });
  */
});
