/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../base/Context';
import * as wrappersModule from '../../base/PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { TransferOwnership } from '../../procedures/TransferOwnership';
import * as TransferOwnershipModule from '../../procedures/TransferOwnership';
import { Procedure } from '../Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  TransferOwnershipProcedureArgs,
} from '../../types';
import { PolymathError } from '../../base/PolymathError';
import { Wallet } from '../../base/Wallet';
import { Factories } from '../../base/Context';
import { mockFactories } from '../../testUtils/mockFactories';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import { SecurityToken } from '../../entities';

const params: TransferOwnershipProcedureArgs = {
  symbol: 'TEST1',
  newOwner: '0x0123456789012345678901234567890123456789',
};

const ownerAddress = '0x0101010101010101010101010101010101010101';

describe('TransferOwnership', () => {
  let target: TransferOwnership;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let factoryMockSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test TransferOwnership
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');

    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    securityTokenMock.mock('owner', Promise.resolve(ownerAddress));
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(ownerAddress) }));

    factoryMockSetup = mockFactories();
    // prettier-ignore
    factoryMockSetup.securityTokenFactory =
      securityTokenFactoryMock.getMockInstance();

    target = new TransferOwnership(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have TransferOwnership type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.TransferOwnership);
    });
  });

  describe('TransferOwnership', () => {
    test('should throw error if current wallet is not the security token owner', async () => {
      contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x123') }));
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the owner of this Security Token to transfer ownership`,
        })
      );
    });

    test('should throw error if new owner is equal to the current one', async () => {
      target = new TransferOwnership(
        { ...params, newOwner: ownerAddress },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `New owner must be different from the current one to transfer ownership`,
        })
      );
    });

    test('should throw if the new owner address is not a valid address', async () => {
      target = new TransferOwnership(
        {
          ...params,
          newOwner: 'invalid',
        },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `New owner address is invalid`,
        })
      );
    });

    test('should add a transaction to the queue to transfer ownership of the security token', async () => {
      securityTokenMock.mock('transferOwnership', Promise.resolve('TransferOwnership'));
      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().transferOwnership)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.TransferOwnership
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should successfully refresh the security token', async () => {
      const refreshStub = securityTokenFactoryMock.mock('refresh', Promise.resolve(undefined));

      // prettier-ignore
      const resolverValue =
        await TransferOwnershipModule.createTransferOwnershipResolver(
          factoryMockSetup,
          params.symbol
        )();

      expect(
        refreshStub.getCall(0).calledWithExactly(
          SecurityToken.generateId({
            symbol: params.symbol,
          })
        )
      ).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
