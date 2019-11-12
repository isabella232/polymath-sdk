import { ImportMock, MockManager, StaticMockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { ModifyShareholderData } from '../../procedures/ModifyShareholderData';
import { Procedure } from '~/procedures/Procedure';
import { ErrorCode, ProcedureType } from '~/types';
import * as shareholderFactoryModule from '~/entities/factories/ShareholderFactory';
import * as securityTokenFactoryModule from '~/entities/factories/SecurityTokenFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { mockFactories } from '~/testUtils/mockFactories';
import * as shareholdersEntityModule from '~/entities/SecurityToken/Shareholders';
import * as securityTokenEntityModule from '~/entities/SecurityToken/SecurityToken';
import { SecurityToken } from '~/entities/SecurityToken/SecurityToken';
import { PolymathError } from '~/PolymathError';
import { Shareholder } from '~/entities';

const params = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  owner: '0x3',
  shareholderData: [
    {
      address: '0x1',
      canSendAfter: new Date(2030, 1),
      canReceiveAfter: new Date(0, 0),
      kycExpiry: new Date(2035, 1),
      canBuyFromSto: true,
      isAccredited: true,
    },
  ],
};

describe('ModifyShareholderData', () => {
  let target: ModifyShareholderData;

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

  const securityTokenId = 'ST ID';
  const testAddress = '0x6666666666666666666666666666666666666666';
  const testAddress2 = '0x9999999999999999999999999999999999999999';

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ModifyShareholderData
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

    const shareHolders = [
      {
        address: testAddress,
        canSendAfter: new Date(Date.now()),
        canReceiveAfter: new Date(1980, 1),
        kycExpiry: new Date(2035, 1),
        canBuyFromSto: true,
        isAccredited: true,
      },
      {
        address: testAddress2,
        canSendAfter: new Date(Date.now()),
        canReceiveAfter: new Date(1980, 1),
        kycExpiry: new Date(2035, 1),
        canBuyFromSto: true,
        isAccredited: true,
      },
    ];
    shareholdersEntityMock.mock('getShareholders', shareHolders);
    securityTokenEntityMock.set('shareholders', shareholdersEntityMock.getMockInstance());
    securityTokenEntityMock.set('uid', securityTokenId);

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

    wrappersMock.mock('getAttachedModules', Promise.resolve([gtmMock.getMockInstance()]));

    // Instantiate ModifyShareholderData
    target = new ModifyShareholderData(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyShareholderData type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyShareholderData);
    });
  });

  describe('ModifyShareholderData', () => {
    test('should add a transaction to the queue to create a new checkpoint', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();
      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(gtmMock.getMockInstance().modifyKYCDataMulti)
      ).toEqual(true);
      expect(
        addTransactionSpy.getCall(1).calledWith(gtmMock.getMockInstance().modifyInvestorFlagMulti)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should return the newly created checkpoint', async () => {
      const shareholderObject = {
        shareholder: {
          securityTokenId: () => params.symbol,
          address: () => testAddress,
        },
      };
      const fetchStub = shareholderFactoryMock.mock('fetch', Promise.resolve(shareholderObject));

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual([shareholderObject]);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          Shareholder.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            address: params.shareholderData[0].address,
          })
        )
      ).toEqual(true);

      expect(fetchStub.callCount).toBe(1);
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

    test('should throw if there is an invalid epoch time', async () => {
      const invalidParams = params;
      invalidParams.shareholderData[0].kycExpiry = new Date(0);
      target = new ModifyShareholderData(invalidParams, contextMock.getMockInstance());
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message:
            "Cannot set dates to epoch. If you're trying to revoke a shareholder's KYC, use .revokeKyc()",
        })
      );
    });
    /*
    test('should throw if modifying share holder fails', async () => {
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Modify shareholder data failed: Nothing to modify',
        })
      );
    });
*/
    test('should throw if the general transfer manager is not enabled', async () => {
      wrappersMock.mock('getAttachedModules', {});
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `General Transfer Manager for token "${
            params.symbol
          }" isn't enabled. Please report this issue to the Polymath team`,
        })
      );
    });
  });
});
