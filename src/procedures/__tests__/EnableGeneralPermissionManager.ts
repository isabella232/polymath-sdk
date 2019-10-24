import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { EnableGeneralPermissionManager } from '../../procedures/EnableGeneralPermissionManager';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, PolyTransactionTag } from '~/types';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
  address: '0x4444444444444444444444444444444444444444',
};

describe('EnableGeneralPermissionManager', () => {
  let target: EnableGeneralPermissionManager;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryObject>;
  let etherDividendsMock: MockManager<contractWrappersModule.EtherDividendCheckpoint_3_0_0>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateEtherDividendDistribution
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryObject');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(params1.address));

    etherDividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'EtherDividendCheckpoint_3_0_0'
    );
    getAttachedModulesMockStub = wrappersMock.mock(
      'getModuleFactoryAddress',
      Promise.resolve(params1.address)
    );
    tokenFactoryMockStub = tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    // Instantiate EnableGeneralPermissionManager
    target = new EnableGeneralPermissionManager(
      {
        symbol: params1.symbol,
      },
      contextMock.getMockInstance()
    );
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('Types', () => {
    test('should extend procedure and have EnableGeneralPermissionManager type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('EnableGeneralPermissionManager');
    });
  });

  describe('EnableGeneralPermissionManager', () => {
    test('should send the transaction to EnableGeneralPermissionManager', async () => {
      const addTransactionSpy = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.withArgs(securityTokenMock.getMockInstance().addModuleWithLabel, {
          tag: PolyTransactionTag.EnableGeneralPermissionManager,
        }).callCount
      ).toBe(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        sinon
          .stub()
          .withArgs({ address: params1.symbol })
          .throws()
      );

      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params1.symbol}`,
        })
      );
    });
  });
});
