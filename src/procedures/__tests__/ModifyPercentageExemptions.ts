import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../base/Context';
import * as wrappersModule from '../../base/PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { ModifyPercentageExemptions } from '../../procedures/ModifyPercentageExemptions';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../base/PolymathError';
import {
  ModifyPercentageExemptionsProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';

const securityTokenAddress = '0x2222222222222222222222222222222222222222';
const testAddress = '0x3333333333333333333333333333333333333333';
const testAddress2 = '0x4444444444444444444444444444444444444444';

const params: ModifyPercentageExemptionsProcedureArgs = {
  symbol: 'TEST1',
  allowPrimaryIssuance: true,
  whitelistEntries: [
    { address: testAddress, whitelisted: true },
    { address: testAddress2, whitelisted: true },
  ],
};

describe('ModifyPercentageExemptions', () => {
  let target: ModifyPercentageExemptions;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let percentageTransferMock: MockManager<contractWrappersModule.PercentageTransferManager_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ModifyPercentageExemptions
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(securityTokenAddress));

    percentageTransferMock = ImportMock.mockClass(
      contractWrappersModule,
      'PercentageTransferManager_3_0_0'
    );

    wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([percentageTransferMock.getMockInstance()])
    );
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    percentageTransferMock.mock('allowPrimaryIssuance', Promise.resolve(true));
    percentageTransferMock.mock('whitelist', Promise.resolve(false));

    // Instantiate ModifyPercentageExemptions
    target = new ModifyPercentageExemptions(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyPercentageExemptions type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyPercentageExemptions);
    });
  });

  describe('ModifyPercentageExemptions', () => {
    test('should add a transaction to the queue to only make a change to allow primary issuance', async () => {
      // Instantiate ModifyPercentageExemptions will work without whitelist entries
      target = new ModifyPercentageExemptions(
        { symbol: params.symbol, allowPrimaryIssuance: true },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');

      percentageTransferMock.mock(
        'setAllowPrimaryIssuance',
        Promise.resolve('SetAllowPrimaryIssuance')
      );
      percentageTransferMock.mock('allowPrimaryIssuance', Promise.resolve(false));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(percentageTransferMock.getMockInstance().setAllowPrimaryIssuance, {
            tag: PolyTransactionTag.SetAllowPrimaryIssuance,
          })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify percentage exemptions and make a change to allow primary issuance', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');

      percentageTransferMock.mock(
        'setAllowPrimaryIssuance',
        Promise.resolve('SetAllowPrimaryIssuance')
      );
      percentageTransferMock.mock('modifyWhitelistMulti', Promise.resolve('ModifyWhitelistMulti'));
      percentageTransferMock.mock('allowPrimaryIssuance', Promise.resolve(false));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(percentageTransferMock.getMockInstance().modifyWhitelistMulti, {
            tag: PolyTransactionTag.ModifyWhitelistMulti,
          })
      ).toEqual(true);

      expect(
        addTransactionSpy
          .getCall(1)
          .calledWithExactly(percentageTransferMock.getMockInstance().setAllowPrimaryIssuance, {
            tag: PolyTransactionTag.SetAllowPrimaryIssuance,
          })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should add a transaction to the queue to only modify percentage exemptions', async () => {
      // Instantiate ModifyPercentageExemptions without allow primary issuance, it is not needed
      target = new ModifyPercentageExemptions(
        { symbol: params.symbol, whitelistEntries: params.whitelistEntries },
        contextMock.getMockInstance()
      );

      percentageTransferMock.mock('modifyWhitelistMulti', Promise.resolve('ModifyWhitelistMulti'));
      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(percentageTransferMock.getMockInstance().modifyWhitelistMulti, {
            tag: PolyTransactionTag.ModifyWhitelistMulti,
          })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
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

    test('should throw if the whitelist data being passed is the same data as currently in the contract', async () => {
      percentageTransferMock.mock('whitelist', Promise.resolve(true));
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Whitelist data passed is the same data currently in the contract',
        })
      );
    });

    test('should throw if the percentage ownership restrictions feature is not enabled', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must enable the PercentageOwnershipRestrictions Feature',
        })
      );
    });

    test('should throw if there are no parameters passed in to modify', async () => {
      // Instantiate ModifyPercentageExemptions with only a symbol
      target = new ModifyPercentageExemptions(
        { symbol: params.symbol },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Nothing to modify. Please pass the corresponding parameters',
        })
      );
    });
  });
});
