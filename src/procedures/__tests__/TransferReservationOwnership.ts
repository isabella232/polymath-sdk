/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { restore, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { TransferReservationOwnership } from '../../procedures/TransferReservationOwnership';
import { Procedure } from '../../procedures/Procedure';
import { ProcedureType, PolyTransactionTag, ErrorCode } from '../../types';
import { PolymathError } from '../../PolymathError';
import * as TransferReservationOwnershipModule from '../../procedures/TransferReservationOwnership';
import * as securityTokenReservationFactoryModule from '../../entities/factories/SecurityTokenReservationFactory';
import { mockFactories } from '../../testUtils/mockFactories';
import { Wallet } from '../../Wallet';
import { Factories } from '../../Context';
import { SecurityTokenReservation } from '../../entities';

const params = {
  symbol: 'TEST',
  newOwner: '0x3333333333333333333333333333333333333333',
};

describe('TransferReservationOwnership', () => {
  let target: TransferReservationOwnership;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let securityTokenRegistryMock: MockManager<contractWrappersModule.SecurityTokenRegistry>;
  let securityTokenReservationFactoryMock: MockManager<
    securityTokenReservationFactoryModule.SecurityTokenReservationFactory
  >;
  let factoryMockSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test TransferReservationOwnership
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenRegistryMock = ImportMock.mockClass(
      contractWrappersModule,
      'SecurityTokenRegistry'
    );
    securityTokenReservationFactoryMock = ImportMock.mockClass(
      securityTokenReservationFactoryModule,
      'SecurityTokenReservationFactory'
    );

    securityTokenRegistryMock.mock(
      'getTickerDetails',
      Promise.resolve({ status: false, owner: '0x01' })
    );

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    factoryMockSetup = mockFactories();
    // prettier-ignore
    factoryMockSetup.securityTokenReservationFactory =
      securityTokenReservationFactoryMock.getMockInstance();

    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x02') }));
    contextMock.set('factories', factoryMockSetup);

    // Instantiate TransferReservationOwnership
    target = new TransferReservationOwnership(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have TransferReservationOwnership type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.TransferReservationOwnership);
    });
  });

  describe('TransferReservationOwnership', () => {
    test('should throw error if token is already launched', async () => {
      securityTokenRegistryMock.mock(
        'getTickerDetails',
        Promise.resolve({ status: true, owner: '0x01' })
      );

      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The ${
            params.symbol
          } Security Token has already been launched, ownership cannot be transferred`,
        })
      );
    });

    test('should throw error if current wallet is not the reservation owner', async () => {
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Only the reservation owner can transfer ownership to another wallet`,
        })
      );
    });

    test('should throw error if new owner is equal to the current one', async () => {
      contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x01') }));

      target = new TransferReservationOwnership(
        { ...params, newOwner: '0x01' },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `New owner must be different from the current one to transfer ownership`,
        })
      );
    });

    test('should add a transaction to the queue to transfer ownership of the reservation', async () => {
      contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x01') }));

      const transferTickerOwnershipArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenRegistryMock.mock(
        'transferTickerOwnership',
        Promise.resolve('TransferTickerOwnership')
      );
      const { transferTickerOwnership } = securityTokenRegistryMock.getMockInstance();
      addTransactionStub.withArgs(transferTickerOwnership).returns(transferTickerOwnershipArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(transferTickerOwnershipArgsSpy.getCall(0).args[0]).toEqual({
        newOwner: params.newOwner,
        ticker: params.symbol,
      });
      expect(transferTickerOwnershipArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenRegistryMock.getMockInstance().transferTickerOwnership)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.TransferReservationOwnership
      );
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should successfully refresh the security token reservation with the new owner address', async () => {
      const refreshStub = securityTokenReservationFactoryMock.mock(
        'refresh',
        Promise.resolve(undefined)
      );

      // prettier-ignore
      const resolverValue =
        await TransferReservationOwnershipModule.createTransferReservationOwnershipResolver(
          factoryMockSetup,
          params.symbol
        )();

      expect(
        refreshStub.getCall(0).calledWithExactly(
          SecurityTokenReservation.generateId({
            symbol: params.symbol,
          })
        )
      ).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
