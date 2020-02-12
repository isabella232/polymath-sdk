/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager, StaticMockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import {
  BigNumber,
  TransactionReceiptWithDecodedLogs,
  TransferStatusCode,
} from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as issueTokensModule from '../IssueTokens';
import { IssueTokens } from '../IssueTokens';
import { Procedure } from '../Procedure';
import * as shareholdersEntityModule from '../../entities/SecurityToken/Shareholders';
import * as securityTokenEntityModule from '../../entities/SecurityToken/SecurityToken';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  IssueTokensProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import * as shareholderFactoryModule from '../../entities/factories/ShareholderFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { ModifyShareholderData } from '..';
import { mockFactories } from '../../testUtils/mockFactories';
import { Shareholder } from '../../entities';
import { Factories } from '../../Context';

const securityTokenId = 'ST ID';
const testAddress = '0x6666666666666666666666666666666666666666';
const testAddress2 = '0x9999999999999999999999999999999999999999';
const testAddress3 = '0x8888888888888888888888888888888888888888';
const params: IssueTokensProcedureArgs = {
  symbol: 'TEST1',
  issuanceData: [
    {
      address: testAddress3,
      amount: new BigNumber(1),
      shareholderData: {
        canSendAfter: new Date(2030, 1),
        canReceiveAfter: new Date(1980, 1),
        kycExpiry: new Date(2035, 1),
        canBuyFromSto: true,
        isAccredited: true,
      },
    },
    {
      address: testAddress,
      amount: new BigNumber(1),
    },
  ],
};

describe('IssueTokens', () => {
  let target: IssueTokens;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let factoryMockSetup: Factories;

  // Mock factories
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  const securityTokenFactoryMock = ImportMock.mockClass(
    securityTokenFactoryModule,
    'SecurityTokenFactory'
  );
  const shareholderFactoryMock = ImportMock.mockClass(
    shareholderFactoryModule,
    'ShareholderFactory'
  );
  let shareholdersEntityMock: MockManager<shareholdersEntityModule.Shareholders>;

  let securityTokenEntityMock: MockManager<securityTokenEntityModule.SecurityToken>;
  let securityTokenEntityStaticMock: StaticMockManager<securityTokenEntityModule.SecurityToken>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test MintTokens
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    moduleWrapperFactoryMock = ImportMock.mockClass(
      moduleWrapperFactoryModule,
      'MockedModuleWrapperFactoryModule'
    );

    shareholdersEntityMock = ImportMock.mockClass(shareholdersEntityModule, 'Shareholders');

    securityTokenEntityMock = ImportMock.mockClass(securityTokenEntityModule, 'SecurityToken');
    securityTokenEntityStaticMock = ImportMock.mockStaticClass(
      securityTokenEntityModule,
      'SecurityToken'
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.set('moduleFactory', moduleWrapperFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    factoryMockSetup = mockFactories();

    wrappersMock.mock('getAttachedModules', Promise.resolve([]));

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
    securityTokenEntityStaticMock.mock('generateId', 'id');
    securityTokenFactoryMock.mock('fetch', securityTokenEntityMock.getMockInstance());
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    factoryMockSetup.shareholderFactory = shareholderFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate IssueTokens
    target = new IssueTokens(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have IssueTokens type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.IssueTokens);
    });
  });

  describe('MintTokens', () => {
    test('should add the transaction to the queue to issue tokens and add a procedure to modify shareholder data', async () => {
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('issueMulti', Promise.resolve('IssueMulti'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(securityTokenMock.getMockInstance().issueMulti)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.IssueMulti);
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(ModifyShareholderData)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should return an array of the shareholders for whom tokens were issued', async () => {
      const shareholderObject = {
        securityTokenId: params.symbol,
        address: testAddress,
      };
      const fetchStub = shareholderFactoryMock.mock('fetch', Promise.resolve(shareholderObject));

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual([shareholderObject, shareholderObject]);

      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          Shareholder.generateId({
            securityTokenId,
            address: testAddress3,
          })
        )
      ).toEqual(true);
      expect(
        fetchStub.getCall(1).calledWithExactly(
          Shareholder.generateId({
            securityTokenId,
            address: testAddress,
          })
        )
      ).toEqual(true);
      expect(fetchStub.callCount).toBe(2);
    });

    test('should refresh the security token factory with resolver', async () => {
      const refreshStub = securityTokenFactoryMock.mock('refresh', Promise.resolve(undefined));

      const resolverValue = await issueTokensModule.createRefreshSecurityTokenFactoryResolver(
        factoryMockSetup,
        securityTokenId
      )();

      expect(refreshStub.getCall(0).calledWithExactly(securityTokenId)).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
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

    test('should throw if any issuance addresses can not receive tokens', async () => {
      target = new IssueTokens(
        {
          ...params,
          issuanceData: [{ address: testAddress, amount: new BigNumber(1) }],
        },
        contextMock.getMockInstance()
      );

      securityTokenMock.mock(
        'canTransferFrom',
        Promise.resolve({
          statusCode: TransferStatusCode.TransferFailure,
        })
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot issue tokens to the following addresses: [${testAddress}]. Reasons: [${
            TransferStatusCode.TransferFailure
          }]`,
        })
      );
    });
  });
});
