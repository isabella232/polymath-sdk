/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { SecurityTokenEvents } from '@polymathnetwork/contract-wrappers';
import { CreateCheckpoint } from '../../procedures/CreateCheckpoint';
import { Procedure } from '../../procedures/Procedure';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, PolyTransactionTag, ProcedureType } from '../../types';
import * as utilsModule from '../../utils';
import * as checkpointFactoryModule from '../../entities/factories/CheckpointFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { Checkpoint, SecurityToken } from '../../entities';

const params = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('CreateCheckpoint', () => {
  let target: CreateCheckpoint;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;

  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;

  // Mock factories
  let checkpointFactoryMock: MockManager<checkpointFactoryModule.CheckpointFactory>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateCheckpoint
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

    checkpointFactoryMock = ImportMock.mockClass(checkpointFactoryModule, 'CheckpointFactory');
    const factoryMockSetup = mockFactories();
    factoryMockSetup.checkpointFactory = checkpointFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate CreateCheckpoint
    target = new CreateCheckpoint(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateCheckpoint type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateCheckpoint);
    });
  });

  describe('createCheckpoint', () => {
    test('should add a transaction to the queue to create a new checkpoint', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('createCheckpoint', Promise.resolve('CreateCheckpoint'));

      // Real call
      await target.prepareTransactions();
      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().createCheckpoint)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.CreateCheckpoint);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if corresponding checkpoint event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Checkpoint was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the newly created checkpoint', async () => {
      const indexValue = 1;
      const checkpointObject = {
        securityTokenId: () => params.symbol,
        index: () => indexValue,
      };

      const fetchStub = checkpointFactoryMock.mock('fetch', Promise.resolve(checkpointObject));
      const findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _checkpointId: new BigNumber(indexValue),
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      const receipt = {} as TransactionReceiptWithDecodedLogs;
      await resolver.run(receipt);

      // Verification for resolver result
      expect(await resolver.result).toEqual(checkpointObject);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          Checkpoint.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            index: indexValue,
          })
        )
      ).toEqual(true);
      expect(fetchStub.callCount).toBe(1);
      // Verifications for findEvents
      expect(
        findEventsStub.getCall(0).calledWithMatch({
          eventName: SecurityTokenEvents.CheckpointCreated,
        })
      ).toEqual(true);
      expect(findEventsStub.callCount).toBe(1);
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
  });
});
