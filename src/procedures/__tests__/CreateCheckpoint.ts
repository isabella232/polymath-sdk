import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import BigNumber from 'bignumber.js';
import { CreateCheckpoint } from '../../procedures/CreateCheckpoint';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
import * as utilsModule from '../../utils';
import * as checkpointFactoryModule from '~/entities/factories/CheckpointFactory';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { mockFactories } from '~/testUtils/MockFactories';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('CreateCheckpoint', () => {
  let target: CreateCheckpoint;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let findEventsStub: SinonStub<any, any>;

  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let tokenFactoryMockStub: SinonStub<any, any>;

  // Mock factories
  let checkpointFactoryMock: MockManager<checkpointFactoryModule.CheckpointFactory>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateCheckpoint
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    tokenFactoryMockStub = tokenFactoryMock.mock(
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
    target = new CreateCheckpoint(
      {
        symbol: params1.symbol,
      },
      contextMock.getMockInstance()
    );
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateCheckpoint type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateCheckpoint);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      const addTransactionSpy = sinon.spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();
      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().controllerTransfer)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if corresponding checkpoint event is not fired', async () => {
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Checkpoint was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should correctly return the resolver', async () => {
      const checkpointObject = {
        checkpoint: {
          securityTokenId: () => Promise.resolve(params1.symbol),
          index: () => Promise.resolve(1),
        },
      };
      const fetchStub = checkpointFactoryMock.mock('fetch', checkpointObject);
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _checkpointId: new BigNumber(1),
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual(checkpointObject);
      expect(fetchStub.callCount).toBe(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
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
  });
});
