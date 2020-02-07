/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as dividendFactoryModule from '../../entities/factories/DividendDistributionFactory';
import { ModifyDividendsDefaultExclusionList } from '../../procedures/ModifyDividendsDefaultExclusionList';
import { Procedure } from '../../procedures/Procedure';
import { ProcedureType, ErrorCode, PolyTransactionTag } from '../../types';
import { PolymathError } from '../../PolymathError';
import { mockFactories } from '../../testUtils/mockFactories';
import { Factories } from '../../Context';
import { Wallet } from '../../Wallet';

const params = {
  symbol: 'TEST',
  shareholderAddresses: ['0x01'],
};

describe('ModifyDividendsDefaultExclusionList', () => {
  let target: ModifyDividendsDefaultExclusionList;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let erc20DividendsMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;
  let dividendFactoryMock: MockManager<dividendFactoryModule.DividendDistributionFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test ModifyDividendsDefaultExclusionList
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
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x01') }));
    target = new ModifyDividendsDefaultExclusionList(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyDividendsDefaultExclusionList type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyDividendsDefaultExclusionList);
    });
  });

  describe('ModifyDividendsDefaultExclusionList', () => {
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

    test('should add a transaction to modify the exclusion list', async () => {
      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendsMock.getMockInstance()])
      );

      erc20DividendsMock.mock('setDefaultExcluded', Promise.resolve('SetDefaultExcluded'));

      const addTransactionSpy = spy(target, 'addTransaction');

      await target.prepareTransactions();

      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(erc20DividendsMock.getMockInstance().setDefaultExcluded)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.SetDefaultExcluded
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });
  });
});
