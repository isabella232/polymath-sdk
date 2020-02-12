/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import { BigNumber, ERC20DividendCheckpointEvents } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contextModule from '../../base/Context';
import * as wrappersModule from '../../base/PolymathBase';
import * as approveModule from '../ApproveErc20';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { CreateDividendDistribution } from '../CreateDividendDistribution';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../base/PolymathError';
import { ErrorCode, PolyTransactionTag, ProcedureType } from '../../types';
import { ApproveErc20 } from '../ApproveErc20';
import * as dividendDistributionSecurityTokenFactoryModule from '../../entities/factories/DividendDistributionFactory';
import * as utilsModule from '../../utils';
import { mockFactories } from '../../testUtils/mockFactories';
import { DividendDistribution, SecurityToken } from '../../entities';

const params = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  erc20Address: '0x1',
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
};

describe('CreateDividendDistribution', () => {
  let target: CreateDividendDistribution;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let approvalMock: MockManager<approveModule.ApproveErc20>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;

  let erc20DividendsMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;

  let dividendDistributionFactoryMock: MockManager<
    dividendDistributionSecurityTokenFactoryModule.DividendDistributionFactory
  >;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateDividendDistribution
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');

    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    // Import mock out of ApproveErc20
    approvalMock = ImportMock.mockClass(approveModule, 'ApproveErc20');
    approvalMock.mock('prepareTransactions', Promise.resolve());
    approvalMock.set('transactions' as any, []);
    approvalMock.set('fees' as any, []);

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    ImportMock.mockClass(contractWrappersModule, 'GeneralPermissionManager_3_0_0');
    erc20DividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'ERC20DividendCheckpoint_3_0_0'
    );
    tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});
    erc20DividendsMock.mock('address', Promise.resolve(params.erc20Address));
    wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([erc20DividendsMock.getMockInstance()])
    );

    dividendDistributionFactoryMock = ImportMock.mockClass(
      dividendDistributionSecurityTokenFactoryModule,
      'DividendDistributionFactory'
    );

    const factoryMockSetup = mockFactories();
    // prettier-ignore
    factoryMockSetup.dividendDistributionFactory =
      dividendDistributionFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate CreateDividendDistribution
    target = new CreateDividendDistribution(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateDividendDistribution type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateDividendDistribution);
    });
  });

  describe('CreateDividendDistribution', () => {
    test('should add a transaction to the queue to create an erc20 dividend distribution and to approve erc20 token', async () => {
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      erc20DividendsMock.mock(
        'createDividendWithCheckpointAndExclusions',
        Promise.resolve('CreateDividendWithCheckpointAndExclusions')
      );

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(
            erc20DividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
          )
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.CreateErc20DividendDistribution
      );
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should send add a transaction to the queue to create arc20 dividend distribution with taxWitholding data', async () => {
      target = new CreateDividendDistribution(
        {
          ...params,
          taxWithholdings: [
            {
              address: '0x5555555555555555555555555555555555555555',
              percentage: 50,
            },
          ],
        },
        contextMock.getMockInstance()
      );
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      erc20DividendsMock.mock(
        'createDividendWithCheckpointAndExclusions',
        Promise.resolve('CreateDividendWithCheckpointAndExclusions')
      );
      erc20DividendsMock.mock('setWithholding', Promise.resolve('SetWithholding'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(
            erc20DividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
          )
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.CreateErc20DividendDistribution
      );
      expect(
        addTransactionSpy.getCall(1).calledWith(erc20DividendsMock.getMockInstance().setWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(1).lastArg.tag).toEqual(
        PolyTransactionTag.SetErc20TaxWithholding
      );
      expect(addTransactionSpy.callCount).toEqual(2);
      expect(addProcedureSpy.callCount).toEqual(1);
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

    test('should throw if corresponding dividend distribution event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The ERC20 Dividend Distribution was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the created erc20 dividend distribution', async () => {
      const dividendIndex = 1;
      const dividendObject = {
        securityTokenId: () => Promise.resolve(params.symbol),
        index: () => Promise.resolve(dividendIndex),
      };

      const fetchStub = dividendDistributionFactoryMock.mock(
        'fetch',
        Promise.resolve(dividendObject)
      );
      const findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _dividendIndex: new BigNumber(dividendIndex),
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);

      // Verification for resolver result
      expect(await resolver.result).toEqual(dividendObject);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          DividendDistribution.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            index: dividendIndex,
          })
        )
      ).toEqual(true);
      expect(fetchStub.callCount).toBe(1);
      // Verifications for findEvents
      expect(
        findEventsStub.getCall(0).calledWithMatch({
          eventName: ERC20DividendCheckpointEvents.ERC20DividendDeposited,
        })
      ).toEqual(true);
      expect(findEventsStub.callCount).toBe(1);
    });

    test('should throw error if the erc20 dividends manager has not been enabled', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The ERC20 Dividends Manager hasn't been enabled",
        })
      );
    });
  });
});
