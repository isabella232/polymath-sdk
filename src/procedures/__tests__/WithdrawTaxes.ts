import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import { Factories } from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { WithdrawTaxes } from '../../procedures/WithdrawTaxes';
import * as withdrawTaxesModule from '../../procedures/WithdrawTaxes';
import { Procedure } from '../../procedures/Procedure';
import {
  DividendType,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
  WithdrawTaxesProcedureArgs,
} from '../../types';
import { PolymathError } from '../../PolymathError';
import { mockFactories } from '../../testUtils/mockFactories';
import * as dividendDistributionFactoryModule from '../../entities/factories/DividendDistributionFactory';
import { DividendDistribution, SecurityToken } from '../../entities';

const params: WithdrawTaxesProcedureArgs = {
  symbol: 'TEST1',
  dividendIndex: 1,
  dividendType: DividendType.Erc20,
};

describe('WithdrawTaxes', () => {
  let target: WithdrawTaxes;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let erc20DividendMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;
  let ethDividendMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;
  let dividendFactoryMock: MockManager<
    dividendDistributionFactoryModule.DividendDistributionFactory
  >;
  let factoriesMockedSetup: Factories;
  let securityTokenGeneratedId: string;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and dividendDistributionFactory to test WithdrawTaxes
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');

    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    erc20DividendMock = ImportMock.mockClass(
      contractWrappersModule,
      'ERC20DividendCheckpoint_3_0_0'
    );
    ethDividendMock = ImportMock.mockClass(contractWrappersModule, 'EtherDividendCheckpoint_3_0_0');

    dividendFactoryMock = ImportMock.mockClass(
      dividendDistributionFactoryModule,
      'DividendDistributionFactory'
    );

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.dividendDistributionFactory = dividendFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);

    securityTokenGeneratedId = SecurityToken.generateId({
      symbol: params.symbol,
    });

    target = new WithdrawTaxes(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have WithdrawTaxes type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.WithdrawTaxes);
    });
  });

  describe('SetDividendsWallet', () => {
    test('should throw if there is no valid security token being provided', async () => {
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

    test('should throw if there is no valid dividend type being provided', async () => {
      // Instantiate WithdrawTaxes with incorrect dividend type
      target = new WithdrawTaxes(
        { ...params, dividendType: 'wrong' as DividendType },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "Dividends of the specified type haven't been enabled",
        })
      );
    });

    test('should add a transaction to the queue to withdraw tax withholdings from attached erc20 dividends distribution', async () => {
      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendMock.getMockInstance()])
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      erc20DividendMock.mock('withdrawWithholding', Promise.resolve('WithdrawTaxWithholdings'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(erc20DividendMock.getMockInstance().withdrawWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.WithdrawTaxWithholdings
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to withdraw tax withholdings from attached ether dividends distribution', async () => {
      target = new WithdrawTaxes(
        { ...params, dividendType: DividendType.Eth },
        contextMock.getMockInstance()
      );
      wrappersMock.mock('getAttachedModules', Promise.resolve([ethDividendMock.getMockInstance()]));

      const addTransactionSpy = spy(target, 'addTransaction');
      ethDividendMock.mock('withdrawWithholding', Promise.resolve('WithdrawTaxWithholdings'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(ethDividendMock.getMockInstance().withdrawWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.WithdrawTaxWithholdings
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should successfully refresh ERC20 dividends factory', async () => {
      const refreshStub = dividendFactoryMock.mock('refresh', Promise.resolve());

      const resolverValue = await withdrawTaxesModule.createWithdrawTaxesResolver(
        DividendType.Erc20,
        params.dividendIndex,
        factoriesMockedSetup,
        params.symbol
      )();

      expect(
        refreshStub.getCall(0).calledWithExactly(
          DividendDistribution.generateId({
            securityTokenId: securityTokenGeneratedId,
            dividendType: DividendType.Erc20,
            index: params.dividendIndex,
          })
        )
      ).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });

    test('should successfully refresh ETH dividends factory', async () => {
      const refreshStub = dividendFactoryMock.mock('refresh', Promise.resolve());

      const resolverValue = await withdrawTaxesModule.createWithdrawTaxesResolver(
        DividendType.Eth,
        params.dividendIndex,
        factoriesMockedSetup,
        params.symbol
      )();

      expect(
        refreshStub.getCall(0).calledWithExactly(
          DividendDistribution.generateId({
            securityTokenId: securityTokenGeneratedId,
            dividendType: DividendType.Eth,
            index: params.dividendIndex,
          })
        )
      ).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
