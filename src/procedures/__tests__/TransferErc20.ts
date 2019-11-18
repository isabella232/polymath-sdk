import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber, TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';
import { Procedure } from '../Procedure';
import { ErrorCode, ProcedureType, TransferErc20ProcedureArgs } from '~/types';
import * as erc20TokenBalanceFactoryModule from '~/entities/factories/Erc20TokenBalanceFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '~/Wallet';
import { TransferErc20 } from '~/procedures';
import * as transferErc20Module from '~/procedures/TransferErc20';
import { mockFactories } from '../../testUtils/mockFactories';
import { PolymathError } from '../../PolymathError';
import { Erc20TokenBalance } from '../../entities';
import { Factories } from '../../Context';

const params: TransferErc20ProcedureArgs = {
  amount: new BigNumber(10),
  receiver: '0x6666666666666666666666666666666666666666',
  tokenAddress: '0x7777777777777777777777777777777777777777',
};

describe('TransferErc20', () => {
  let target: TransferErc20;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;

  // Mock factories
  let erc20TokenBalanceFactoryMock: MockManager<
    erc20TokenBalanceFactoryModule.Erc20TokenBalanceFactory
  >;

  let securityTokenRegistryMock: MockManager<contractWrappersModule.SecurityTokenRegistry>;

  let erc20Mock: MockManager<contractWrappersModule.ERC20>;
  let factoryMockSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test TransferErc20
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    moduleWrapperFactoryMock = ImportMock.mockClass(
      moduleWrapperFactoryModule,
      'MockedModuleWrapperFactoryModule'
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.set('moduleFactory', moduleWrapperFactoryMock.getMockInstance());

    erc20Mock = ImportMock.mockClass(contractWrappersModule, 'ERC20');
    erc20Mock.mock('balanceOf', Promise.resolve(new BigNumber(20)));

    erc20Mock.mock('address', Promise.resolve(params.tokenAddress));

    securityTokenRegistryMock = ImportMock.mockClass(
      contractWrappersModule,
      'SecurityTokenRegistry'
    );

    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());

    securityTokenRegistryMock.mock('isSecurityToken', Promise.resolve(false));

    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());

    erc20TokenBalanceFactoryMock = ImportMock.mockClass(
      erc20TokenBalanceFactoryModule,
      'Erc20TokenBalanceFactory'
    );

    factoryMockSetup = mockFactories();
    factoryMockSetup.erc20TokenBalanceFactory = erc20TokenBalanceFactoryMock.getMockInstance();

    erc20TokenBalanceFactoryMock.mock('refresh', {});
    contextMock.set('factories', factoryMockSetup);
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(params.receiver) })
    );

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('address', Promise.resolve(params.tokenAddress));
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));

    wrappersMock.mock('getModuleFactoryAddress', Promise.resolve(params.receiver));

    // Instantiate TransferErc20
    target = new TransferErc20(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have TransferErc20 type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.TransferErc20);
    });
  });

  describe('TransferErc20', () => {
    test('should add a transaction to the queue to transfer an erc20 token', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addTransactionSpy.getCall(0).calledWith(erc20Mock.getMockInstance().transfer)).toEqual(
        true
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if supplied address does not correspond to erc20 token', async () => {
      wrappersMock
        .mock('getERC20TokenWrapper')
        .withArgs({ address: params.tokenAddress })
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'The supplied address does not correspond to an ERC20 token',
        })
      );
    });

    test('should throw if address belongs to a security token, not an erc20 token', async () => {
      securityTokenRegistryMock.mock('isSecurityToken', Promise.resolve(true));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message:
            "This address belongs to a Security Token. To transfer Security Tokens, use the functions in the Security Token's transfers namespace",
        })
      );
    });

    test('should add a transaction to the queue to transfer an erc20 token getting token funds if there are not enough funds, only on testnet', async () => {
      wrappersMock.mock('isTestnet', Promise.resolve(true));
      erc20Mock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addTransactionSpy.getCall(0).calledWith(erc20Mock.getMockInstance().transfer)).toEqual(
        true
      );
      expect(
        addTransactionSpy.getCall(1).calledWith(wrappersMock.getMockInstance().getPolyTokens)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should throw if there are not enough funds to make transfer', async () => {
      erc20Mock.mock('balanceOf', Promise.resolve(new BigNumber(2)));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Not enough funds',
        })
      );
    });

    test('should successfully create erc20 transfer resolver', async () => {
      const refreshStub = erc20TokenBalanceFactoryMock.mock('refresh', Promise.resolve(undefined));
      const address = params.tokenAddress ? params.tokenAddress : '';
      const erc20TokenBalanceGeneratedId = Erc20TokenBalance.generateId({
        tokenAddress: address,
        walletAddress: params.receiver,
      });
      const resolverValue = await transferErc20Module.createTransferErc20Resolver(
        factoryMockSetup,
        address,
        params.receiver
      )();
      expect(refreshStub.getCall(0).calledWithExactly(erc20TokenBalanceGeneratedId)).toEqual(true);
      expect(await resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
