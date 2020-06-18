/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { restore, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Procedure } from '../Procedure';
import {
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
  TransferErc20ProcedureArgs,
} from '../../types';
import * as erc20TokenBalanceFactoryModule from '../../entities/factories/Erc20TokenBalanceFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '../../Wallet';
import { TransferErc20 } from '../../procedures';
import * as transferErc20Module from '../../procedures/TransferErc20';
import { mockFactories } from '../../testUtils/mockFactories';
import { PolymathError } from '../../PolymathError';
import { Erc20TokenBalance } from '../../entities';
import { Factories } from '../../Context';

const params: TransferErc20ProcedureArgs = {
  amount: new BigNumber(10),
  receiver: '0x6666666666666666666666666666666666666666',
  tokenAddress: '0x7777777777777777777777777777777777777777',
};
const currentWallet = '0x8888888888888888888888888888888888888888';
const polyTokenAddress = '0x9999999999999999999999999999999999999999';

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
    securityTokenRegistryMock.mock('isSecurityToken', Promise.resolve(false));

    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());
    wrappersMock.mock('getERC20TokenWrapper', erc20Mock.getMockInstance());

    erc20TokenBalanceFactoryMock = ImportMock.mockClass(
      erc20TokenBalanceFactoryModule,
      'Erc20TokenBalanceFactory'
    );

    factoryMockSetup = mockFactories();
    factoryMockSetup.erc20TokenBalanceFactory = erc20TokenBalanceFactoryMock.getMockInstance();

    erc20TokenBalanceFactoryMock.mock('refresh', Promise.resolve());
    contextMock.set('factories', factoryMockSetup);
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(currentWallet) }));

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('address', Promise.resolve(polyTokenAddress));
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));

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
    test('should add a transaction to the queue to transfer an erc20 token with specified token address to a specified receiving address', async () => {
      const transferArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      erc20Mock.mock('transfer', Promise.resolve('Transfer'));
      const { transfer } = erc20Mock.getMockInstance();
      addTransactionStub.withArgs(transfer).returns(transferArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(transferArgsSpy.getCall(0).args[0]).toEqual({
        to: params.receiver,
        value: params.amount,
      });
      expect(transferArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub.getCall(0).calledWith(erc20Mock.getMockInstance().transfer)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.TransferErc20);
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to transfer poly as the parameters do not include token address', async () => {
      target = new TransferErc20(
        { ...params, tokenAddress: undefined },
        contextMock.getMockInstance()
      );
      polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(20)));

      const transferArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      polyTokenMock.mock('transfer', Promise.resolve('Transfer'));
      const { transfer } = polyTokenMock.getMockInstance();
      addTransactionStub.withArgs(transfer).returns(transferArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(transferArgsSpy.getCall(0).args[0]).toEqual({
        to: params.receiver,
        value: params.amount,
      });
      expect(transferArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub.getCall(0).calledWith(polyTokenMock.getMockInstance().transfer)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.TransferErc20);
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should throw if supplied address does not correspond to a valid erc20 token', async () => {
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
            "This address belongs to a Security Token. To transfer Security Tokens, use the functions in the Security Token's transfers or controller namespace",
        })
      );
    });

    test('should add an extra transaction to get POLY from the faucet if the balance is insufficient, specifically on testnet', async () => {
      const balanceOfPoly = new BigNumber(2);
      wrappersMock.mock('isTestnet', Promise.resolve(true));
      erc20Mock.mock('address', Promise.resolve(polyTokenAddress));
      erc20Mock.mock('balanceOf', Promise.resolve(balanceOfPoly));

      const transferArgsSpy = sinon.spy();
      const getPolyTokensArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');

      erc20Mock.mock('transfer', Promise.resolve('Transfer'));
      wrappersMock.mock('getPolyTokens', Promise.resolve('GetPolyTokens'));

      const { transfer } = erc20Mock.getMockInstance();
      addTransactionStub.withArgs(transfer).returns(transferArgsSpy);
      const { getPolyTokens } = wrappersMock.getMockInstance();
      addTransactionStub.withArgs(getPolyTokens).returns(getPolyTokensArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(transferArgsSpy.getCall(0).args[0]).toEqual({
        to: params.receiver,
        value: params.amount,
      });
      expect(transferArgsSpy.callCount).toEqual(1);

      expect(getPolyTokensArgsSpy.getCall(0).args[0]).toEqual({
        address: currentWallet,
        amount: params.amount.minus(balanceOfPoly),
      });
      expect(getPolyTokensArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub.getCall(0).calledWith(wrappersMock.getMockInstance().getPolyTokens)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.GetTokens);
      expect(
        addTransactionStub.getCall(1).calledWith(erc20Mock.getMockInstance().transfer)
      ).toEqual(true);
      expect(addTransactionStub.getCall(1).lastArg.tag).toEqual(PolyTransactionTag.TransferErc20);
      expect(addTransactionStub.callCount).toEqual(2);
    });

    test('should throw error if there are not enough funds to make an erc20 transfer', async () => {
      erc20Mock.mock('balanceOf', Promise.resolve(new BigNumber(2)));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Not enough funds',
        })
      );
    });

    test('should successfully refresh the corresponding ERC20 Balance Entity', async () => {
      const refreshStub = erc20TokenBalanceFactoryMock.mock('refresh', Promise.resolve());
      const erc20TokenBalanceGeneratedId = Erc20TokenBalance.generateId({
        tokenAddress: params.tokenAddress!,
        walletAddress: params.receiver,
      });
      const resolverValue = await transferErc20Module.createTransferErc20Resolver(
        factoryMockSetup,
        params.tokenAddress!,
        params.receiver
      )();
      expect(refreshStub.getCall(0).calledWithExactly(erc20TokenBalanceGeneratedId)).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
