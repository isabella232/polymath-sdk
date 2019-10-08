import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import BigNumber from 'bignumber.js';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import { CreateSecurityToken } from '../../procedures/CreateSecurityToken';
import { Procedure } from '~/procedures/Procedure';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1111111111111111111111111111111111111111',
  owner: '0x3333333333333333333333333333333333333333',
  amount: new BigNumber(1),
  divisible: false,
};

describe('CreateSecurityToken', () => {
  let target: CreateSecurityToken;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;

  let securityTokenRegistryMock: MockManager<contractWrappersObject.SecurityTokenRegistry>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');

    securityTokenRegistryMock = ImportMock.mockClass(
      contractWrappersObject,
      'SecurityTokenRegistry'
    );
    securityTokenRegistryMock.mock('tickerAvailable', Promise.resolve(false));
    securityTokenRegistryMock.mock('isTickerRegisteredByCurrentIssuer', Promise.resolve(true));
    securityTokenRegistryMock.mock('isTokenLaunched', Promise.resolve(false));
    securityTokenRegistryMock.mock(
      'getFees',
      Promise.resolve([new BigNumber(1), new BigNumber(1)])
    );
    securityTokenRegistryMock.mock('address', Promise.resolve(params1.address));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());

    // Instantiate CreateSecurityToken
    target = new CreateSecurityToken(
      {
        name: params1.name,
        symbol: params1.symbol,
        divisible: params1.divisible,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have CreateSecurityToken type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('CreateSecurityToken');
    });
  });

  describe('CreateSecurityToken', () => {
    test('should send the transaction to CreateSecurityToken', async () => {
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
    });
  });
});
