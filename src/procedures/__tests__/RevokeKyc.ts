/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager, StaticMockManager } from 'ts-mock-imports';
import sinon, { restore, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import { BigNumber, GeneralTransferManager_3_0_0 } from '@polymathnetwork/contract-wrappers';
import { cloneDeep } from 'lodash';
import { RevokeKyc } from '../../procedures/RevokeKyc';
import { Procedure } from '../../procedures/Procedure';
import { ErrorCode, PolyTransactionTag, ProcedureType, RevokeKycProcedureArgs } from '../../types';
import * as shareholderFactoryModule from '../../entities/factories/ShareholderFactory';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import * as shareholdersEntityModule from '../../entities/SecurityToken/Shareholders';
import * as securityTokenEntityModule from '../../entities/SecurityToken/SecurityToken';
import { SecurityToken } from '../../entities/SecurityToken/SecurityToken';
import { PolymathError } from '../../PolymathError';
import { Shareholder } from '../../entities';

const testAddress = '0x6666666666666666666666666666666666666666';
const testAddress2 = '0x9999999999999999999999999999999999999999';

const zeroDate = new Date(0);

const params: RevokeKycProcedureArgs = {
  symbol: 'TEST1',
  shareholderAddresses: [testAddress, testAddress2],
};

const oldShareholdersData: Shareholder[] = [
  new Shareholder({
    address: testAddress,
    canSendAfter: new Date(1980, 1),
    canReceiveAfter: new Date(1980, 1),
    kycExpiry: new Date(2035, 1),
    canBuyFromSto: true,
    isAccredited: true,
    securityTokenId: 'Id',
    securityTokenSymbol: params.symbol,
    balance: new BigNumber(1),
  }),
  new Shareholder({
    address: testAddress2,
    canSendAfter: new Date(1980, 1),
    canReceiveAfter: new Date(1980, 1),
    kycExpiry: new Date(2035, 1),
    canBuyFromSto: true,
    isAccredited: true,
    securityTokenId: 'Id',
    securityTokenSymbol: params.symbol,
    balance: new BigNumber(1),
  }),
];

describe('RevokeKyc', () => {
  let target: RevokeKyc;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  // Mock factories
  let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  let shareholdersEntityMock: MockManager<shareholdersEntityModule.Shareholders>;
  let securityTokenEntityStaticMock: StaticMockManager<securityTokenEntityModule.SecurityToken>;
  let securityTokenEntityMock: MockManager<securityTokenEntityModule.SecurityToken>;

  let gtmMock: MockManager<contractWrappersModule.GeneralTransferManager_3_0_0>;
  let gtmMockInstance: GeneralTransferManager_3_0_0;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test RevokeKyc procedure
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    shareholdersEntityMock = ImportMock.mockClass(shareholdersEntityModule, 'Shareholders');
    securityTokenEntityMock = ImportMock.mockClass(securityTokenEntityModule, 'SecurityToken');
    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );

    shareholdersEntityMock.mock('getShareholders', oldShareholdersData);
    securityTokenEntityMock.set('shareholders', shareholdersEntityMock.getMockInstance());

    securityTokenEntityStaticMock = ImportMock.mockStaticClass(
      securityTokenEntityModule,
      'SecurityToken'
    );
    securityTokenEntityStaticMock.mock('generateId', 'id');
    securityTokenFactoryMock.mock('fetch', securityTokenEntityMock.getMockInstance());

    const factoryMockSetup = mockFactories();
    factoryMockSetup.shareholderFactory = shareholderFactoryMock.getMockInstance();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    gtmMock = ImportMock.mockClass(contractWrappersModule, 'GeneralTransferManager_3_0_0');
    gtmMockInstance = gtmMock.getMockInstance();
    wrappersMock.mock('getAttachedModules', Promise.resolve([gtmMockInstance]));

    // Instantiate RevokeKyc
    target = new RevokeKyc(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have RevokeKyc type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.RevokeKyc);
    });
  });

  describe('RevokeKyc', () => {
    test('should add a transaction to the queue to revoke kyc for specified shareholders', async () => {
      const modifyKYCDataMultiArgsStub = sinon.stub();
      modifyKYCDataMultiArgsStub.returns([{}]);
      const addTransactionStub = stub(target, 'addTransaction');
      gtmMock.mock('modifyKYCDataMulti', Promise.resolve('ModifyKYCDataMulti'));
      const { modifyKYCDataMulti } = gtmMock.getMockInstance();
      addTransactionStub.withArgs(modifyKYCDataMulti).returns(modifyKYCDataMultiArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(modifyKYCDataMultiArgsStub.getCall(0).args[0]).toEqual({
        investors: [oldShareholdersData[0].address, oldShareholdersData[1].address],
        canReceiveAfter: [zeroDate, zeroDate],
        canSendAfter: [zeroDate, zeroDate],
        expiryTime: [zeroDate, zeroDate],
      });
      expect(modifyKYCDataMultiArgsStub.callCount).toEqual(1);

      expect(addTransactionStub.getCall(0).calledWith(gtmMockInstance.modifyKYCDataMulti)).toEqual(
        true
      );
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ModifyKycDataMulti
      );
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should return an array of the shareholders which have been modified', async () => {
      const shareholderObject = {
        securityTokenId: params.symbol,
        address: testAddress,
      };
      const fetchStub = shareholderFactoryMock.mock('fetch', Promise.resolve(shareholderObject));
      const refreshStub = shareholderFactoryMock.mock('refresh', Promise.resolve());
      const securityTokenId = SecurityToken.generateId({
        symbol: params.symbol,
      });
      const shareholderId1 = Shareholder.generateId({
        securityTokenId,
        address: testAddress,
      });
      const shareholderId2 = Shareholder.generateId({
        securityTokenId,
        address: testAddress2,
      });

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual([shareholderObject, shareholderObject]);

      // Verifications
      expect(fetchStub.getCall(0).calledWithExactly(shareholderId1)).toEqual(true);
      expect(fetchStub.getCall(1).calledWithExactly(shareholderId2)).toEqual(true);
      expect(fetchStub.callCount).toBe(2);

      expect(refreshStub.getCall(0).calledWithExactly(shareholderId1)).toEqual(true);
      expect(refreshStub.getCall(1).calledWithExactly(shareholderId2)).toEqual(true);
      expect(refreshStub.callCount).toBe(2);
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock
        .mock('getSecurityTokenInstanceFromTicker')
        .withArgs(params.symbol)
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params.symbol}`,
        })
      );
    });

    test('should throw if the general transfer manager is not enabled', async () => {
      wrappersMock.mock('getAttachedModules', []);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `General Transfer Manager for token "${
            params.symbol
          }" isn't enabled. Please report this issue to the Polymath team`,
        })
      );
    });

    test('should throw if the array of shareholder addresses passed in is empty', async () => {
      target = new RevokeKyc(
        { symbol: params.symbol, shareholderAddresses: [] },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must provide at least one shareholder address to revoke KYC for',
        })
      );
    });

    test('should throw if any shareholder addresses passed in were already revoked', async () => {
      const oldShareholdersRevoked = cloneDeep(oldShareholdersData);
      oldShareholdersRevoked[0].kycExpiry = zeroDate;
      oldShareholdersRevoked[0].canSendAfter = zeroDate;
      oldShareholdersRevoked[0].canReceiveAfter = zeroDate;
      oldShareholdersRevoked[1].kycExpiry = zeroDate;
      oldShareholdersRevoked[1].canSendAfter = zeroDate;
      oldShareholdersRevoked[1].canReceiveAfter = zeroDate;
      shareholdersEntityMock.mock('getShareholders', oldShareholdersRevoked);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `"${params.shareholderAddresses.join(', ')}" already revoked`,
        })
      );
    });
  });
});
