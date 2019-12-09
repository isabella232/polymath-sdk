import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import { Factories } from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as taxWithholdingFactoryModule from '../../entities/factories/TaxWithholdingFactory';
import * as updateDividendsTaxWithholdingListModule from '../../procedures/UpdateDividendsTaxWithholdingList';
import { UpdateDividendsTaxWithholdingList } from '../../procedures';
import { Procedure } from '../../procedures/Procedure';
import {
  DividendType,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
  UpdateDividendsTaxWithholdingListProcedureArgs,
} from '../../types';
import { PolymathError } from '../../PolymathError';
import { mockFactories } from '../../testUtils/mockFactories';
import { SecurityToken, TaxWithholding } from '../../entities';

const testAddress = '0x6666666666666666666666666666666666666666';
const testAddress2 = '0x9999999999999999999999999999999999999999';

const params: UpdateDividendsTaxWithholdingListProcedureArgs = {
  symbol: 'Test1',
  dividendType: DividendType.Eth,
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
  let ethDividendsMock: MockManager<contractWrappersModule.EtherDividendCheckpoint_3_0_0>;
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
    ethDividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'EtherDividendCheckpoint_3_0_0'
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

    test('should throw if there is no valid dividend type being provided', async () => {
      // Instantiate UpdateDividendsTaxWithholdingList with incorrect dividend type
      target = new UpdateDividendsTaxWithholdingList(
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
      // Instantiate UpdateDividendsTaxWithholdingList with ERC20 dividend type
      target = new UpdateDividendsTaxWithholdingList(
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
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));

      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "Dividends of the specified type haven't been enabled",
        })
      );
    });

    test('should add a transaction to the queue update the dividends tax withholding list for an attached ERC20 dividends module', async () => {
      // Instantiate UpdateDividendsTaxWithholdingList with ERC20 dividend type
      target = new UpdateDividendsTaxWithholdingList(
        { ...params, dividendType: DividendType.Erc20 },
        contextMock.getMockInstance()
      );

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

    test('should add a transaction to the queue to update the dividends tax withholding list for an attached ETH dividends module', async () => {
      wrappersMock.mock(
        'getAttachedModules',
        Promise.resolve([ethDividendsMock.getMockInstance()])
      );

      ethDividendsMock.mock('setWithholding', Promise.resolve('SetWithholding'));

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(ethDividendsMock.getMockInstance().setWithholding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.SetEtherTaxWithholding
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should update the dividends tax withholding list for erc20 dividend type', async () => {
      const updateStub = taxWithholdingFactoryMock.mock('update', Promise.resolve(undefined));

      const resolverValue = await updateDividendsTaxWithholdingListModule.updateDividendsTaxWithholdingListResolver(
        factoriesMockedSetup,
        params.symbol,
        params.dividendType,
        params.percentages,
        params.shareholderAddresses
      )();

      expect(
        updateStub.getCall(0).calledWithExactly(
          TaxWithholding.generateId({
            securityTokenId,
            dividendType: params.dividendType,
            shareholderAddress: params.shareholderAddresses[0],
          }),
          { percentage: params.percentages[0] }
        )
      ).toEqual(true);

      expect(
        updateStub.getCall(1).calledWithExactly(
          TaxWithholding.generateId({
            securityTokenId,
            dividendType: params.dividendType,
            shareholderAddress: params.shareholderAddresses[1],
          }),
          { percentage: params.percentages[1] }
        )
      ).toEqual(true);

      expect(resolverValue).toEqual([undefined, undefined]);
      expect(updateStub.callCount).toEqual(2);
    });

    test('should update the dividends tax withholding list for ether dividend type', async () => {
      const updateStub = taxWithholdingFactoryMock.mock('update', Promise.resolve(undefined));
      const dividendType = DividendType.Erc20;

      const resolverValue = await updateDividendsTaxWithholdingListModule.updateDividendsTaxWithholdingListResolver(
        factoriesMockedSetup,
        params.symbol,
        dividendType,
        params.percentages,
        params.shareholderAddresses
      )();

      expect(
        updateStub.getCall(0).calledWithExactly(
          TaxWithholding.generateId({
            securityTokenId,
            dividendType,
            shareholderAddress: params.shareholderAddresses[0],
          }),
          { percentage: params.percentages[0] }
        )
      ).toEqual(true);

      expect(
        updateStub.getCall(1).calledWithExactly(
          TaxWithholding.generateId({
            securityTokenId,
            dividendType,
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
