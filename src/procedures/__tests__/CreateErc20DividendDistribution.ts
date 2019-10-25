import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as approveModule from '../ApproveErc20';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { CreateErc20DividendDistribution } from '../../procedures/CreateErc20DividendDistribution';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
import { ApproveErc20 } from '../ApproveErc20';
import * as dividendDistributionSecurityTokenFactoryModule from '~/entities/factories/DividendDistributionFactory';
import * as utilsModule from '~/utils';
import { mockFactories } from '~/testUtils/MockFactories';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  erc20Address: '0x1',
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
};

describe('CreateErc20DividendDistribution', () => {
  let target: CreateErc20DividendDistribution;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let approvalMock: MockManager<approveModule.ApproveErc20>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryObject>;
  let gpmMock: MockManager<contractWrappersModule.GeneralPermissionManager_3_0_0>;
  let erc20DividendsMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

  let dividendDistributionFactoryMock: MockManager<
    dividendDistributionSecurityTokenFactoryModule.DividendDistributionFactory
  >;
  let findEventsStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateErc20DividendDistribution
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryObject');

    // Import mock out of ApproveErc20
    approvalMock = ImportMock.mockClass(approveModule, 'ApproveErc20');
    approvalMock.mock('prepareTransactions', Promise.resolve());
    approvalMock.set('transactions' as any, []);
    approvalMock.set('fees' as any, []);

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersModule, 'GeneralPermissionManager_3_0_0');
    erc20DividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'ERC20DividendCheckpoint_3_0_0'
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});
    erc20DividendsMock.mock('address', Promise.resolve(params1.erc20Address));
    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([erc20DividendsMock.getMockInstance()])
    );

    dividendDistributionFactoryMock = ImportMock.mockClass(
      dividendDistributionSecurityTokenFactoryModule,
      'DividendDistributionFactory'
    );

    const factoryMockSetup = mockFactories();
    factoryMockSetup.dividendDistributionFactory = dividendDistributionFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate CreateErc20DividendDistribution
    target = new CreateErc20DividendDistribution(
      {
        symbol: params1.symbol,
        maturityDate: params1.maturityDate,
        expiryDate: params1.expiryDate,
        erc20Address: params1.erc20Address,
        amount: params1.amount,
        checkpointIndex: params1.checkpointIndex,
        name: params1.name,
      },
      contextMock.getMockInstance()
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateErc20DividendDistribution type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateErc20DividendDistribution);
    });
  });

  describe('CreateErc20DividendDistribution', () => {
    test('should send the transaction to CreateErc20DividendDistribution', async () => {
      const addProcedureSpy = sinon.spy(target, 'addProcedure');
      const addTransactionSpy = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addProcedureSpy.getCall(0).calledWith(ApproveErc20)).toEqual(true);
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(
            erc20DividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
          )
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should send the transaction to CreateErc20DividendDistribution with taxWitholdings', async () => {
      target = new CreateErc20DividendDistribution(
        {
          symbol: params1.symbol,
          maturityDate: params1.maturityDate,
          expiryDate: params1.expiryDate,
          erc20Address: params1.erc20Address,
          amount: params1.amount,
          checkpointIndex: params1.checkpointIndex,
          name: params1.name,
          taxWithholdings: [
            {
              address: '0x5555555555555555555555555555555555555555',
              percentage: 50,
            },
          ],
        },
        contextMock.getMockInstance()
      );
      const addProcedureSpy = sinon.spy(target, 'addProcedure');
      const addTransactionSpy = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addProcedureSpy.getCall(0).calledWith(ApproveErc20)).toEqual(true);
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(
            erc20DividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
          )
      ).toEqual(true);
      expect(
        addTransactionSpy.getCall(1).calledWith(erc20DividendsMock.getMockInstance().setWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
      expect(addProcedureSpy.callCount).toEqual(1);
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

    test('should throw if corresponding dividend distribution event is not fired', async () => {
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The ERC20 Dividend Distribution was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should correctly return the resolver', async () => {
      const dividendObject = {
        permissions: {
          securityTokenId: () => Promise.resolve(params1.symbol),
          index: () => Promise.resolve(1),
        },
      };
      const fetchStub = dividendDistributionFactoryMock.mock('fetch', dividendObject);
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _dividendIndex: new BigNumber(1),
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual(dividendObject);
      expect(fetchStub.callCount).toBe(1);
    });

    test('should throw error if the erc20 dividends manager has not been enabled', async () => {
      getAttachedModulesMockStub = wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The ERC20 Dividends Manager hasn't been enabled",
        })
      );
    });
  });
});
