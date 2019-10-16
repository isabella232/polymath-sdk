import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { CreateEtherDividendDistribution } from '../../procedures/CreateEtherDividendDistribution';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '~/types';
import { ApproveErc20 } from '~/procedures';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
};

describe('CreateEtherDividendDistribution', () => {
  let target: CreateEtherDividendDistribution;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryObject.MockedTokenFactoryObject>;
  let gpmMock: MockManager<contractWrappersObject.GeneralPermissionManager_3_0_0>;
  let etherDividendsMock: MockManager<contractWrappersObject.EtherDividendCheckpoint_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateEtherDividendDistribution
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryObject, 'MockedTokenFactoryObject');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersObject, 'GeneralPermissionManager_3_0_0');
    etherDividendsMock = ImportMock.mockClass(
      contractWrappersObject,
      'EtherDividendCheckpoint_3_0_0'
    );
    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([etherDividendsMock])
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    // Instantiate CreateEtherDividendDistribution
    target = new CreateEtherDividendDistribution(
      {
        symbol: params1.symbol,
        maturityDate: params1.maturityDate,
        expiryDate: params1.expiryDate,
        amount: params1.amount,
        checkpointIndex: params1.checkpointIndex,
        name: params1.name,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have CreateEtherDividendDistribution type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('CreateEtherDividendDistribution');
    });
  });

  describe('CreateEtherDividendDistribution', () => {
    test('should send the transaction to CreateEtherDividendDistribution', async () => {
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        spyOnAddTransaction.withArgs(etherDividendsMock.getMockInstance().setWithholding).callCount
      ).toBe(1);
      expect(
        spyOnAddTransaction.withArgs(
          etherDividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
        ).callCount
      ).toBe(1);
    });

    test('should throw if there is no supplied valid security token', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        sinon
          .stub()
          .withArgs({ address: params1.symbol })
          .throws()
      );

      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params1.symbol}`,
        })
      );
    });

    test('should throw if eth dividends manager has not been enabled', async () => {
      getAttachedModulesMockStub = wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The ETH Dividends Manager hasn't been enabled",
        })
      );
    });
  });
});
