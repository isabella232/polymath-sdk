import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { CreateEtherDividendDistribution } from '../../procedures/CreateEtherDividendDistribution';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
import * as dividendDistributionSecurityTokenFactoryModule from '~/entities/factories/DividendDistributionFactory';
import * as utilsModule from '~/utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { mockFactories } from '~/testUtils/mockFactories';

const params = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
};

describe('CreateEtherDividendDistribution', () => {
  let target: CreateEtherDividendDistribution;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<
    tokenFactoryModule.MockedTokenFactoryObject
  >;
  let gpmMock: MockManager<
    contractWrappersModule.GeneralPermissionManager_3_0_0
  >;
  let etherDividendsMock: MockManager<
    contractWrappersModule.EtherDividendCheckpoint_3_0_0
  >;

  let dividendDistributionFactoryMock: MockManager<
    dividendDistributionSecurityTokenFactoryModule.DividendDistributionFactory
  >;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateEtherDividendDistribution
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(
      tokenFactoryModule,
      'MockedTokenFactoryObject'
    );
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(
      contractWrappersModule,
      'GeneralPermissionManager_3_0_0'
    );
    etherDividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'EtherDividendCheckpoint_3_0_0'
    );
    wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([etherDividendsMock.getMockInstance()])
    );
    tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    dividendDistributionFactoryMock = ImportMock.mockClass(
      dividendDistributionSecurityTokenFactoryModule,
      'DividendDistributionFactory'
    );
    const factoryMockSetup = mockFactories();
    factoryMockSetup.dividendDistributionFactory = dividendDistributionFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate CreateEtherDividendDistribution
    target = new CreateEtherDividendDistribution(
      params,
      contextMock.getMockInstance()
    );
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateEtherDividendDistribution type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateEtherDividendDistribution);
    });
  });

  describe('CreateEtherDividendDistribution', () => {
    test('should add the transaction to the queue to create an ether dividend distribution', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(
            etherDividendsMock.getMockInstance()
              .createDividendWithCheckpointAndExclusions
          )
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to create an ether dividend distribution with taxwithholdings', async () => {
      target = new CreateEtherDividendDistribution(
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

      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(
            etherDividendsMock.getMockInstance()
              .createDividendWithCheckpointAndExclusions
          )
      ).toEqual(true);
      expect(
        addTransactionSpy
          .getCall(1)
          .calledWith(etherDividendsMock.getMockInstance().setWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should throw if corresponding eth dividend distribution event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The ETH Dividend Distribution was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the newly created eth dividend distribution', async () => {
      const dividendObject = {
        permissions: {
          securityTokenId: () => 'Id',
          index: () => 1,
        },
      };
      const fetchStub = dividendDistributionFactoryMock.mock(
        'fetch',
        dividendObject
      );
      ImportMock.mockFunction(utilsModule, 'findEvents', [
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

    test('should throw if eth dividends manager has not been enabled', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The ETH Dividends Manager hasn't been enabled",
        })
      );
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
  });
});
