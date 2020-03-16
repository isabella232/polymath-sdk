/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager, StaticMockManager } from 'ts-mock-imports';
import sinon, { stub, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import { FlagsType, GeneralTransferManager_3_0_0 } from '@polymathnetwork/contract-wrappers';
import { cloneDeep } from 'lodash';
import { ModifyTokenholderData } from '../../procedures/ModifyTokenholderData';
import { Procedure } from '../Procedure';
import { ErrorCode, PolyTransactionTag, ProcedureType } from '../../types';
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
const oldTokenholdersData = [
  {
    address: testAddress,
    canSendAfter: new Date(1980, 1),
    canReceiveAfter: new Date(1980, 1),
    kycExpiry: new Date(2035, 1),
    canBuyFromSto: false,
    isAccredited: false,
  },
  {
    address: testAddress2,
    canSendAfter: new Date(1980, 1),
    canReceiveAfter: new Date(1980, 1),
    kycExpiry: new Date(2035, 1),
    canBuyFromSto: false,
    isAccredited: false,
  },
];
const params = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  owner: '0x3',
  tokenholderData: [
    {
      address: testAddress,
      canSendAfter: new Date(2030, 1),
      canReceiveAfter: new Date(1981, 1),
      kycExpiry: new Date(2035, 2),
      canBuyFromSto: true,
      isAccredited: true,
    },
    {
      address: testAddress2,
      canSendAfter: new Date(2030, 1),
      canReceiveAfter: new Date(1981, 1),
      kycExpiry: new Date(2035, 2),
      canBuyFromSto: true,
      isAccredited: true,
    },
  ],
};

describe('ModifyTokenholderData', () => {
  let target: ModifyTokenholderData;

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

  const securityTokenId = 'ST ID';

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ModifyTokenholderData
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
    securityTokenEntityMock.set('uid', securityTokenId);

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

    // Instantiate ModifyTokenholderData
    target = new ModifyTokenholderData(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyTokenholderData type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyTokenholderData);
    });
  });

  describe('ModifyTokenholderData', () => {
    test('should add a transaction to the queue to modify the tokenholders kyc data and flags', async () => {
      const modifyKYCDataMultiArgsStub = sinon.stub();
      modifyKYCDataMultiArgsStub.returns([{}]);

      const modifyInvestorFlagMultiArgsStub = sinon.stub();
      modifyInvestorFlagMultiArgsStub.returns([{}]);

      const addTransactionStub = stub(target, 'addTransaction');

      gtmMock.mock('modifyKYCDataMulti', Promise.resolve('ModifyKYCDataMulti'));
      gtmMock.mock('modifyInvestorFlagMulti', Promise.resolve('ModifyInvestorFlagMulti'));

      const { modifyKYCDataMulti } = gtmMock.getMockInstance();
      addTransactionStub.withArgs(modifyKYCDataMulti).returns(modifyKYCDataMultiArgsStub);
      const { modifyInvestorFlagMulti } = gtmMock.getMockInstance();
      addTransactionStub.withArgs(modifyInvestorFlagMulti).returns(modifyInvestorFlagMultiArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(modifyKYCDataMultiArgsStub.getCall(0).args[0]).toEqual({
        investors: [params.tokenholderData[0].address, params.tokenholderData[1].address],
        canReceiveAfter: [
          params.tokenholderData[0].canReceiveAfter,
          params.tokenholderData[1].canReceiveAfter,
        ],
        canSendAfter: [
          params.tokenholderData[0].canSendAfter,
          params.tokenholderData[1].canSendAfter,
        ],
        expiryTime: [params.tokenholderData[0].kycExpiry, params.tokenholderData[1].kycExpiry],
      });
      expect(modifyKYCDataMultiArgsStub.callCount).toEqual(1);
      expect(addTransactionStub.getCall(0).calledWith(gtmMockInstance.modifyKYCDataMulti)).toEqual(
        true
      );
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ModifyKycDataMulti
      );

      expect(modifyInvestorFlagMultiArgsStub.getCall(0).args[0]).toEqual({
        investors: [
          params.tokenholderData[0].address,
          params.tokenholderData[0].address,
          params.tokenholderData[1].address,
          params.tokenholderData[1].address,
        ],
        flag: [
          FlagsType.IsAccredited,
          FlagsType.CanNotBuyFromSto,
          FlagsType.IsAccredited,
          FlagsType.CanNotBuyFromSto,
        ],
        value: [
          params.tokenholderData[0].isAccredited,
          oldTokenholdersData[0].canBuyFromSto,
          params.tokenholderData[1].isAccredited,
          oldTokenholdersData[1].canBuyFromSto,
        ],
      });
      expect(modifyInvestorFlagMultiArgsStub.callCount).toEqual(1);
      expect(
        addTransactionStub.getCall(1).calledWith(gtmMockInstance.modifyInvestorFlagMulti)
      ).toEqual(true);
      expect(addTransactionStub.getCall(1).lastArg.tag).toEqual(
        PolyTransactionTag.ModifyInvestorFlagMulti
      );
      expect(addTransactionStub.callCount).toEqual(2);
    });

    test('should return an array of the tokenholders which have been modified', async () => {
      const tokenholderObject = {
        securityTokenId: params.symbol,
        address: testAddress,
      };
      const fetchStub = tokenholderFactoryMock.mock('fetch', Promise.resolve(tokenholderObject));

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual([tokenholderObject, tokenholderObject]);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          Tokenholder.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            address: params.tokenholderData[0].address,
          })
        )
      ).toEqual(true);

      expect(
        fetchStub.getCall(1).calledWithExactly(
          Tokenholder.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            address: params.tokenholderData[1].address,
          })
        )
      ).toEqual(true);

      expect(fetchStub.callCount).toBe(2);
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

    test('should throw if modifying share holder fails, as old tokenholder data is same as the new tokenholder data', async () => {
      target = new ModifyTokenholderData(
        { ...params, tokenholderData: oldTokenholdersData },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Modify tokenholder data failed: Nothing to modify',
        })
      );
    });

    test('should add a transaction to the queue to modify tokenholder data without changing flags', async () => {
      const paramsWithoutFlagsChange = cloneDeep(params);
      paramsWithoutFlagsChange.tokenholderData[0].isAccredited = false;
      paramsWithoutFlagsChange.tokenholderData[1].isAccredited = false;
      paramsWithoutFlagsChange.tokenholderData[0].canBuyFromSto = false;
      paramsWithoutFlagsChange.tokenholderData[1].canBuyFromSto = false;
      target = new ModifyTokenholderData(paramsWithoutFlagsChange, contextMock.getMockInstance());

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
        investors: [params.tokenholderData[0].address, params.tokenholderData[1].address],
        canReceiveAfter: [
          params.tokenholderData[0].canReceiveAfter,
          params.tokenholderData[1].canReceiveAfter,
        ],
        canSendAfter: [
          params.tokenholderData[0].canSendAfter,
          params.tokenholderData[1].canSendAfter,
        ],
        expiryTime: [params.tokenholderData[0].kycExpiry, params.tokenholderData[1].kycExpiry],
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

    test('should return the newly created checkpoint without changing flags', async () => {
      const tokenholderObject = {
        securityTokenId: () => params.symbol,
        address: () => testAddress,
      };
      const fetchStub = tokenholderFactoryMock.mock('fetch', Promise.resolve(tokenholderObject));

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual([tokenholderObject, tokenholderObject]);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          Tokenholder.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            address: params.tokenholderData[0].address,
          })
        )
      ).toEqual(true);

      expect(
        fetchStub.getCall(1).calledWithExactly(
          Tokenholder.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            address: params.tokenholderData[1].address,
          })
        )
      ).toEqual(true);

      expect(fetchStub.callCount).toBe(2);
    });

    test('should throw if there is an invalid epoch time used', async () => {
      const invalidParams = cloneDeep(params);
      invalidParams.tokenholderData[0].kycExpiry = new Date(0);
      target = new ModifyTokenholderData(invalidParams, contextMock.getMockInstance());
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message:
            "Cannot set dates to epoch. If you're trying to revoke a tokenholder's KYC, use .revokeKyc()",
        })
      );
    });
  });
});
