import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import { Factories } from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { SetDividendsWallet } from '../../procedures/SetDividendsWallet';
import { Procedure } from '../../procedures/Procedure';
import { ProcedureType, ErrorCode, PolyTransactionTag } from '../../types';
import { PolymathError } from '../../PolymathError';
import { mockFactories } from '../../testUtils/mockFactories';

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

    factoriesMockedSetup = mockFactories();
    contextMock.set('factories', factoriesMockedSetup);

    target = new SetDividendsWallet(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have SetDividendsWallet type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.SetDividendsWallet);
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

    test('should add a transaction to the queue to change the dividends wallet of the attached ERC20 dividends module', async () => {
      erc20DividendMock = ImportMock.mockClass(
        contractWrappersModule,
        'ERC20DividendCheckpointContract_3_0_0'
      );

      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendMock.getMockInstance()])
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      erc20DividendMock.mock('changeWallet', Promise.resolve('ChangeWallet'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(erc20DividendMock.getMockInstance().changeWallet)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.SetDividendsWallet
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });
  });
});
