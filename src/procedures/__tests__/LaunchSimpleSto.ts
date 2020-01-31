/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { restore, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import {
  BigNumber,
  ModuleName,
  SecurityTokenEvents,
  TransactionReceiptWithDecodedLogs,
} from '@polymathnetwork/contract-wrappers';
import { LaunchSimpleSto } from '../LaunchSimpleSto';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  LaunchSimpleStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
  Currency,
} from '../../types';
import * as simpleStoFactoryModule from '../../entities/factories/SimpleStoFactory';
import * as utilsModule from '../../utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '../../Wallet';
import { TransferErc20 } from '..';
import { mockFactories } from '../../testUtils/mockFactories';
import { SimpleSto, SecurityToken } from '../../entities';

const params: LaunchSimpleStoProcedureArgs = {
  symbol: 'TEST1',
  startDate: new Date(2030, 1),
  endDate: new Date(2031, 1),
  tokensOnSale: new BigNumber(1000),
  rate: new BigNumber(10),
  currency: Currency.ETH,
  raisedFundsWallet: '0x6666666666666666666666666666666666666666',
  unsoldTokensWallet: '0x7777777777777777777777777777777777777777',
};

const currentWallet = '0x8888888888888888888888888888888888888888';
const securityTokenAddress = '0x9999999999999999999999999999999999999999';
const polyTokenAddress = '0x5555555555555555555555555555555555555555';
const moduleFactoryAddress = '0x4444444444444444444444444444444444444444';
const costInPoly = new BigNumber(5);
const costInUsd = new BigNumber(6);

describe('LaunchSimpleSto', () => {
  let target: LaunchSimpleSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;

  // Mock factories
  let simpleStoFactoryMock: MockManager<simpleStoFactoryModule.SimpleStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test LaunchCappedSto
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

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(securityTokenAddress));
    securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(10)));

    moduleFactoryMock = ImportMock.mockClass(contractWrappersModule, 'ModuleFactory_3_0_0');
    moduleFactoryMock.mock('setupCostInPoly', Promise.resolve(costInPoly));
    moduleFactoryMock.mock('isCostInPoly', Promise.resolve(false));
    moduleFactoryMock.mock('setupCost', Promise.resolve(costInUsd));

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    moduleWrapperFactoryMock.mock('getModuleFactory', moduleFactoryMock.getMockInstance());

    simpleStoFactoryMock = ImportMock.mockClass(simpleStoFactoryModule, 'SimpleStoFactory');

    const factoryMockSetup = mockFactories();
    factoryMockSetup.simpleStoFactory = simpleStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(currentWallet) }));

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(20)));
    polyTokenMock.mock('address', Promise.resolve(polyTokenAddress));
    polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));

    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));
    wrappersMock.mock('getModuleFactoryAddress', moduleFactoryAddress);

    // Instantiate LaunchSimpleSto
    target = new LaunchSimpleSto(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have LaunchSimpleSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.LaunchSimpleSto);
    });
  });

  describe('LaunchSimpleSto', () => {
    test('should add a transaction to the queue to launch a capped sto with cost in usd', async () => {
      const addModuleWithLabelArgsStub = sinon.stub();
      addModuleWithLabelArgsStub.returns([{}]);

      const addTransactionStub = stub(target, 'addTransaction');

      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      const { addModuleWithLabel } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(addModuleWithLabel).returns(addModuleWithLabelArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addModuleWithLabelArgsStub.getCall(0).args[0]).toEqual({
        moduleName: ModuleName.CappedSTO,
        address: moduleFactoryAddress,
        archived: false,
        maxCost: costInUsd,
        data: {
          cap: params.tokensOnSale,
          endTime: params.endDate,
          fundRaiseType: params.currency,
          fundsReceiver: params.raisedFundsWallet,
          rate: params.rate,
          startTime: params.startDate,
          treasuryWallet: params.unsoldTokensWallet,
        },
      });
      expect(addModuleWithLabelArgsStub.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.fees).toEqual({
        usd: costInUsd,
        poly: costInPoly,
      });
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.EnableCappedSto);
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test("should transfer POLY to the security token if the token's balance doesn't cover the launch fee", async () => {
      const transferErc20ArgsSpy = sinon.spy();
      const addProcedureStub = stub(target, 'addProcedure');
      addProcedureStub.withArgs(TransferErc20).returns(transferErc20ArgsSpy);

      const addModuleWithLabelArgsStub = sinon.stub();
      addModuleWithLabelArgsStub.returns([{}]);

      const addTransactionStub = stub(target, 'addTransaction');
      const currentBalance = Promise.resolve(new BigNumber(1));
      polyTokenMock
        .mock('balanceOf', Promise.resolve(new BigNumber(20)))
        .withArgs({ owner: securityTokenAddress })
        .returns(currentBalance);
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      const { addModuleWithLabel } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(addModuleWithLabel).returns(addModuleWithLabelArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(transferErc20ArgsSpy.getCall(0).args[0]).toEqual({
        amount: costInPoly.minus(await currentBalance),
        receiver: securityTokenAddress,
      });
      expect(transferErc20ArgsSpy.callCount).toBe(1);
      expect(addProcedureStub.getCall(0).calledWithExactly(TransferErc20)).toEqual(true);

      expect(addModuleWithLabelArgsStub.getCall(0).args[0]).toEqual({
        moduleName: ModuleName.CappedSTO,
        address: moduleFactoryAddress,
        archived: false,
        maxCost: costInPoly,
        data: {
          cap: params.tokensOnSale,
          endTime: params.endDate,
          fundRaiseType: params.currency,
          fundsReceiver: params.raisedFundsWallet,
          rate: params.rate,
          startTime: params.startDate,
          treasuryWallet: params.unsoldTokensWallet,
        },
      });
      expect(addModuleWithLabelArgsStub.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.fees).toEqual({
        usd: costInUsd,
        poly: costInPoly,
      });
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.EnableCappedSto);
      expect(addTransactionStub.callCount).toEqual(1);
      expect(addProcedureStub.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to launch a capped sto with cost in poly', async () => {
      const addModuleWithLabelArgsStub = sinon.stub();
      addModuleWithLabelArgsStub.returns([{}]);

      const addTransactionStub = stub(target, 'addTransaction');
      moduleFactoryMock.mock('isCostInPoly', Promise.resolve(true));

      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      const { addModuleWithLabel } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(addModuleWithLabel).returns(addModuleWithLabelArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addModuleWithLabelArgsStub.getCall(0).args[0]).toEqual({
        moduleName: ModuleName.CappedSTO,
        address: moduleFactoryAddress,
        archived: false,
        maxCost: costInPoly,
        data: {
          cap: params.tokensOnSale,
          endTime: params.endDate,
          fundRaiseType: params.currency,
          fundsReceiver: params.raisedFundsWallet,
          rate: params.rate,
          startTime: params.startDate,
          treasuryWallet: params.unsoldTokensWallet,
        },
      });
      expect(addModuleWithLabelArgsStub.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.fees).toEqual({
        usd: null,
        poly: costInPoly,
      });
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.EnableCappedSto);
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should throw if corresponding capped sto event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Capped STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the capped sto object information', async () => {
      const stoObject = {
        securityTokenId: params.symbol,
        stoType: StoType.Simple,
        address: securityTokenAddress,
      };
      const fetchStub = simpleStoFactoryMock.mock('fetch', Promise.resolve(stoObject));
      const moduleAddress = '0x3333333333333333333333333333333333333333';
      const findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _module: moduleAddress,
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);

      // Verification for resolver result
      expect(resolver.result).toEqual(stoObject);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          SimpleSto.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            stoType: StoType.Simple,
            address: moduleAddress,
          })
        )
      ).toEqual(true);
      expect(fetchStub.callCount).toBe(1);
      // Verifications for findEvents
      expect(
        findEventsStub.getCall(0).calledWithMatch({
          eventName: SecurityTokenEvents.ModuleAdded,
        })
      ).toEqual(true);
      expect(findEventsStub.callCount).toBe(1);
    });

    test('should throw if there is no supplied valid security token', async () => {
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
