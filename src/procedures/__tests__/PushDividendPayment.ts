import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as dividendFactoryModule from '../../entities/factories/DividendDistributionFactory';
import * as pushDividendPaymentModule from '../../procedures/PushDividendPayment';
import { PushDividendPayment } from '../../procedures/PushDividendPayment';
import { Procedure } from '../../procedures/Procedure';
import { ProcedureType, ErrorCode, PolyTransactionTag } from '../../types';
import { PolymathError } from '../../PolymathError';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { SecurityToken, DividendDistribution } from '../../entities';

const params = {
  symbol: 'TEST1',
  dividendIndex: 0,
  shareholderAddresses: ['0x01'],
};

describe('PushDividendPayment', () => {
  let target: PushDividendPayment;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let erc20DividendsMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;
  let dividendFactoryMock: MockManager<dividendFactoryModule.DividendDistributionFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test PushDividendPayment
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    erc20DividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'ERC20DividendCheckpoint_3_0_0'
    );
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    dividendFactoryMock = ImportMock.mockClass(
      dividendFactoryModule,
      'DividendDistributionFactory'
    );
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.dividendDistributionFactory = dividendFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);
    target = new PushDividendPayment(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have PushDividendPayment type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.PushDividendPayment);
    });
  });

  describe('PushDividendPayment', () => {
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

    test('should throw if an Erc20 dividend module is not attached', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));

      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The Dividends Feature hasn't been enabled",
        })
      );
    });

    test('should add a transaction to push a dividend payment', async () => {
      wrappersMock.mock(
        'getDividend',
        Promise.resolve({
          shareholders: [
            { address: '0x01', paymentReceived: false },
            { address: '0x02', paymentReceived: false },
            { address: '0x03', paymentReceived: true },
          ],
        })
      );

      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendsMock.getMockInstance()])
      );

      erc20DividendsMock.mock(
        'pushDividendPaymentToAddresses',
        Promise.resolve('PushDividendPaymentToAddresses')
      );

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(erc20DividendsMock.getMockInstance().pushDividendPaymentToAddresses)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.PushDividendPayment
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to push a dividend payment with undefined shareholderAddresses parameter', async () => {
      // Instantiate PushDividendPayment with undefined shareholder address and ERC20 dividend type
      target = new PushDividendPayment(
        {
          ...params,
          shareholderAddresses: undefined,
        },
        contextMock.getMockInstance()
      );

      const shareholders = [];
      for (let i = 0; i < 105; i++) {
        shareholders.push({
          address: `0x${Math.floor(Math.random() * 999 + 1)}`,
          paymentReceived: false,
        });
      }

      wrappersMock.mock(
        'getDividend',
        Promise.resolve({
          shareholders,
        })
      );

      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendsMock.getMockInstance()])
      );

      erc20DividendsMock.mock(
        'pushDividendPaymentToAddresses',
        Promise.resolve('PushDividendPaymentToAddresses')
      );

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(erc20DividendsMock.getMockInstance().pushDividendPaymentToAddresses)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.PushDividendPayment
      );
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should refresh the dividend distribution for which payments were pushed', async () => {
      const refreshStub = dividendFactoryMock.mock('refresh', Promise.resolve(undefined));

      const resolverValue = await pushDividendPaymentModule.createPushDividendPaymentResolver(
        factoriesMockedSetup,
        params.symbol,
        0
      )();

      expect(
        refreshStub.getCall(0).calledWithExactly(
          DividendDistribution.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            index: 0,
          })
        )
      ).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
