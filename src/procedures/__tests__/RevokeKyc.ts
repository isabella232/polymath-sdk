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
import * as tokenholderFactoryModule from '../../entities/factories/TokenholderFactory';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import * as tokenholdersEntityModule from '../../entities/SecurityToken/Tokenholders';
import * as securityTokenEntityModule from '../../entities/SecurityToken/SecurityToken';
import { SecurityToken } from '../../entities/SecurityToken/SecurityToken';
import { PolymathError } from '../../PolymathError';
import { Tokenholder } from '../../entities';

const testAddress = '0x6666666666666666666666666666666666666666';
const testAddress2 = '0x9999999999999999999999999999999999999999';

const zeroDate = new Date(0);

const params: RevokeKycProcedureArgs = {
  symbol: 'TEST1',
  tokenholderAddresses: [testAddress, testAddress2],
};

const oldTokenholdersData: Tokenholder[] = [
  new Tokenholder({
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
  new Tokenholder({
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
  let tokenholderFactoryMock: MockManager<tokenholderFactoryModule.TokenholderFactory>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  let tokenholdersEntityMock: MockManager<tokenholdersEntityModule.Tokenholders>;
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

    tokenholdersEntityMock = ImportMock.mockClass(tokenholdersEntityModule, 'Tokenholders');
    securityTokenEntityMock = ImportMock.mockClass(securityTokenEntityModule, 'SecurityToken');
    tokenholderFactoryMock = ImportMock.mockClass(tokenholderFactoryModule, 'TokenholderFactory');
    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );

    tokenholdersEntityMock.mock('getTokenholders', oldTokenholdersData);
    securityTokenEntityMock.set('tokenholders', tokenholdersEntityMock.getMockInstance());

    securityTokenEntityStaticMock = ImportMock.mockStaticClass(
      securityTokenEntityModule,
      'SecurityToken'
    );
    securityTokenEntityStaticMock.mock('generateId', 'id');
    securityTokenFactoryMock.mock('fetch', securityTokenEntityMock.getMockInstance());

    const factoryMockSetup = mockFactories();
    factoryMockSetup.tokenholderFactory = tokenholderFactoryMock.getMockInstance();
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
    test('should add a transaction to the queue to revoke kyc for specified tokenholders', async () => {
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
        investors: [oldTokenholdersData[0].address, oldTokenholdersData[1].address],
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

    test('should return an array of the tokenholders which have been modified', async () => {
      const tokenholderObject = {
        securityTokenId: params.symbol,
        address: testAddress,
      };
      const fetchStub = tokenholderFactoryMock.mock('fetch', Promise.resolve(tokenholderObject));
      const refreshStub = tokenholderFactoryMock.mock('refresh', Promise.resolve());
      const securityTokenId = SecurityToken.generateId({
        symbol: params.symbol,
      });
      const tokenholderId1 = Tokenholder.generateId({
        securityTokenId,
        address: testAddress,
      });
      const tokenholderId2 = Tokenholder.generateId({
        securityTokenId,
        address: testAddress2,
      });

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual([tokenholderObject, tokenholderObject]);

      // Verifications
      expect(fetchStub.getCall(0).calledWithExactly(tokenholderId1)).toEqual(true);
      expect(fetchStub.getCall(1).calledWithExactly(tokenholderId2)).toEqual(true);
      expect(fetchStub.callCount).toBe(2);

      expect(refreshStub.getCall(0).calledWithExactly(tokenholderId1)).toEqual(true);
      expect(refreshStub.getCall(1).calledWithExactly(tokenholderId2)).toEqual(true);
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

    test('should throw if the array of tokenholder addresses passed in is empty', async () => {
      target = new RevokeKyc(
        { symbol: params.symbol, tokenholderAddresses: [] },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must provide at least one tokenholder address to revoke KYC for',
        })
      );
    });

    test('should throw if any tokenholder addresses passed in were already revoked', async () => {
      const oldTokenholdersRevoked = cloneDeep(oldTokenholdersData);
      oldTokenholdersRevoked[0].kycExpiry = zeroDate;
      oldTokenholdersRevoked[0].canSendAfter = zeroDate;
      oldTokenholdersRevoked[0].canReceiveAfter = zeroDate;
      oldTokenholdersRevoked[1].kycExpiry = zeroDate;
      oldTokenholdersRevoked[1].canSendAfter = zeroDate;
      oldTokenholdersRevoked[1].canReceiveAfter = zeroDate;
      tokenholdersEntityMock.mock('getTokenholders', oldTokenholdersRevoked);
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `"${params.tokenholderAddresses.join(', ')}" already revoked`,
        })
      );
    });
  });
});
