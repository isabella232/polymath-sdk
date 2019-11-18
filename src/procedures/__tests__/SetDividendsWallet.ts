import { ImportMock, MockManager } from 'ts-mock-imports';
import { stub, spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import { Factories } from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { SetDividendsWallet } from '../../procedures/SetDividendsWallet';
import * as setDividendsWalletModule from '../../procedures/SetDividendsWallet';
import { Procedure } from '~/procedures/Procedure';
import { ProcedureType, DividendType, ErrorCode } from '~/types';
import { PolymathError } from '~/PolymathError';
import { mockFactories } from '~/testUtils/mockFactories';
import * as erc20FactoryModule from '~/entities/factories/Erc20DividendsManagerFactory';
import * as ethFactoryModule from '~/entities/factories/EthDividendsManagerFactory';
import { SecurityToken, Erc20DividendsManager, EthDividendsManager } from '~/entities';

const params = {
  symbol: 'TEST1',
  address: '0x3333333333333333333333333333333333333333',
};

describe('SetDividendsWallet', () => {
  let target: SetDividendsWallet;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let erc20DividendMock: MockManager<contractWrappersModule.ERC20DividendCheckpointContract_3_0_0>;
  let ethDividendMock: MockManager<contractWrappersModule.EtherDividendCheckpointContract_3_0_0>;
  let erc20FactoryMock: MockManager<erc20FactoryModule.Erc20DividendsManagerFactory>;
  let ethFactoryMock: MockManager<ethFactoryModule.EthDividendsManagerFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test SetDividendsWallet
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

    erc20FactoryMock = ImportMock.mockClass(erc20FactoryModule, 'Erc20DividendsManagerFactory');
    ethFactoryMock = ImportMock.mockClass(ethFactoryModule, 'EthDividendsManagerFactory');
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.erc20DividendsManagerFactory = erc20FactoryMock.getMockInstance();
    factoriesMockedSetup.ethDividendsManagerFactory = ethFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have SetDividendsWallet type', async () => {
      target = new SetDividendsWallet(
        { ...params, dividendType: DividendType.Erc20 },
        contextMock.getMockInstance()
      );
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.SetDividendsWallet);
    });
  });

  describe('SetDividendsWallet', () => {
    test('should throw if there is no valid security token being provided', async () => {
      // Instantiate SetDividendsWallet with incorrect security symbol
      target = new SetDividendsWallet(
        { ...params, dividendType: DividendType.Erc20 },
        contextMock.getMockInstance()
      );

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
      // Instantiate SetDividendsWallet with incorrect dividend type
      target = new SetDividendsWallet(
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

    test('should throw if an Erc20 dividend module is not attached', async () => {
      target = new SetDividendsWallet(
        { ...params, dividendType: DividendType.Erc20 },
        contextMock.getMockInstance()
      );

      wrappersMock.mock('getAttachedModules', Promise.resolve([]));

      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "Dividends of the specified type haven't been enabled",
        })
      );
    });

    test('should throw if an Eth dividend module is not attached', async () => {
      target = new SetDividendsWallet(
        { ...params, dividendType: DividendType.Eth },
        contextMock.getMockInstance()
      );

      wrappersMock.mock('getAttachedModules', Promise.resolve([]));

      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "Dividends of the specified type haven't been enabled",
        })
      );
    });

    test('should add a transaction to the queue to change the dividends wallet of an attached ERC20 dividends module', async () => {
      erc20DividendMock = ImportMock.mockClass(
        contractWrappersModule,
        'ERC20DividendCheckpointContract_3_0_0'
      );

      target = new SetDividendsWallet(
        { ...params, dividendType: DividendType.Erc20 },
        contextMock.getMockInstance()
      );

      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendMock.getMockInstance()])
      );

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(erc20DividendMock.getMockInstance().changeWallet)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to change the dividends wallet of an attached ETH dividends module', async () => {
      ethDividendMock = ImportMock.mockClass(
        contractWrappersModule,
        'EtherDividendCheckpointContract_3_0_0'
      );

      target = new SetDividendsWallet(
        { ...params, dividendType: DividendType.Eth },
        contextMock.getMockInstance()
      );

      wrappersMock.mock('getAttachedModules', Promise.resolve([ethDividendMock.getMockInstance()]));

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(ethDividendMock.getMockInstance().changeWallet)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should successfully refresh ERC20 dividends factory', async () => {
      const refreshStub = erc20FactoryMock.mock('refresh', Promise.resolve(undefined));

      const resolverValue = await setDividendsWalletModule.createSetDividendsWalletResolver(
        DividendType.Erc20,
        factoriesMockedSetup,
        params.symbol
      )();

      expect(
        refreshStub.getCall(0).calledWithExactly(
          Erc20DividendsManager.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            dividendType: DividendType.Erc20,
          })
        )
      ).toEqual(true);
      expect(await resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });

  test('should successfully refresh Eth dividends factory', async () => {
    const refreshStub = ethFactoryMock.mock('refresh', Promise.resolve(undefined));

    const resolverValue = await setDividendsWalletModule.createSetDividendsWalletResolver(
      DividendType.Eth,
      factoriesMockedSetup,
      params.symbol
    )();

    expect(
      refreshStub.getCall(0).calledWithExactly(
        EthDividendsManager.generateId({
          securityTokenId: SecurityToken.generateId({ symbol: params.symbol }),
          dividendType: DividendType.Eth,
        })
      )
    ).toEqual(true);
    expect(await resolverValue).toEqual(undefined);
    expect(refreshStub.callCount).toEqual(1);
  });
});
