/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../base/Context';
import { Factories } from '../../base/Context';
import * as wrappersModule from '../../base/PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as taxWithholdingFactoryModule from '../../entities/factories/TaxWithholdingFactory';
import * as updateDividendsTaxWithholdingListModule from '../../procedures/UpdateDividendsTaxWithholdingList';
import { UpdateDividendsTaxWithholdingList } from '../../procedures';
import { Procedure } from '../../procedures/Procedure';
import {
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
  UpdateDividendsTaxWithholdingListProcedureArgs,
} from '../../types';
import { PolymathError } from '../../base/PolymathError';
import { mockFactories } from '../../testUtils/mockFactories';
import { SecurityToken, TaxWithholding } from '../../entities';

const testAddress = '0x6666666666666666666666666666666666666666';
const testAddress2 = '0x9999999999999999999999999999999999999999';

const params: UpdateDividendsTaxWithholdingListProcedureArgs = {
  symbol: 'Test1',
  shareholderAddresses: [testAddress, testAddress2],
  percentages: [10, 15],
};

describe('UpdateDividendsTaxWithholdingList', () => {
  let target: UpdateDividendsTaxWithholdingList;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let erc20DividendsMock: MockManager<contractWrappersModule.ERC20DividendCheckpoint_3_0_0>;
  let taxWithholdingFactoryMock: MockManager<taxWithholdingFactoryModule.TaxWithholdingFactory>;
  let factoriesMockedSetup: Factories;
  let securityTokenId: string;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test update dividends tax withholding list
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
    taxWithholdingFactoryMock = ImportMock.mockClass(
      taxWithholdingFactoryModule,
      'TaxWithholdingFactory'
    );
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.taxWithholdingFactory = taxWithholdingFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);

    securityTokenId = SecurityToken.generateId({
      symbol: params.symbol,
    });

    target = new UpdateDividendsTaxWithholdingList(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have UpdateDividendsTaxWithholdingList type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.UpdateDividendsTaxWithholdingList);
    });
  });

  describe('UpdateDividendsTaxWithholdingList', () => {
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

    test('should add a transaction to the queue update the dividends tax withholding list for an attached ERC20 dividends module', async () => {
      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([erc20DividendsMock.getMockInstance()])
      );

      erc20DividendsMock.mock('setWithholding', Promise.resolve('SetWithholding'));

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(erc20DividendsMock.getMockInstance().setWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.SetErc20TaxWithholding
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should update the dividends tax withholding list for erc20 dividend type', async () => {
      const updateStub = taxWithholdingFactoryMock.mock('update', Promise.resolve(undefined));

      // prettier-ignore
      const resolverValue =
        await updateDividendsTaxWithholdingListModule.updateDividendsTaxWithholdingListResolver(
          factoriesMockedSetup,
          params.symbol,
          params.percentages,
          params.shareholderAddresses
        )();

      expect(
        updateStub.getCall(0).calledWithExactly(
          TaxWithholding.generateId({
            securityTokenId,
            shareholderAddress: params.shareholderAddresses[0],
          }),
          { percentage: params.percentages[0] }
        )
      ).toEqual(true);

      expect(
        updateStub.getCall(1).calledWithExactly(
          TaxWithholding.generateId({
            securityTokenId,
            shareholderAddress: params.shareholderAddresses[1],
          }),
          { percentage: params.percentages[1] }
        )
      ).toEqual(true);

      expect(resolverValue).toEqual([undefined, undefined]);
      expect(updateStub.callCount).toEqual(2);
    });
  });
});
