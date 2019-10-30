import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub, stub, spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { SetController } from '../../procedures/SetController';
import { Procedure } from '~/procedures/Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  SetControllerProcedureArgs,
  ErrorCode,
} from '~/types';
import { PolymathError } from '~/PolymathError';
import * as utilsModule from '../../utils';
import { Wallet } from '../../Wallet';

const params1 = {
  symbol: 'TEST1',
  controller: '0x3333333333333333333333333333333333333333',
};

describe('SetController', () => {
  let target: SetController;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<
    tokenFactoryModule.MockedTokenFactoryObject
  >;
  let securityTokenMock: MockManager<
    contractWrappersModule.SecurityToken_3_0_0
  >;

  let tokenFactoryMockStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test AssignSecurityRole
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(
      tokenFactoryModule,
      'MockedTokenFactoryObject'
    );
    securityTokenMock = ImportMock.mockClass(
      contractWrappersModule,
      'SecurityToken_3_0_0'
    );

    tokenFactoryMockStub = tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have SetController type', async () => {
      target = new SetController(
        {
          symbol: params1.symbol,
          controller: params1.controller,
        },
        contextMock.getMockInstance()
      );
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('SetController');
    });
  });

  describe('SetController', () => {
    test('should throw if there is no valid security token being provided', async () => {
      // Instantiate SetController with incorrect security symbol
      target = new SetController(
        {
          symbol: params1.symbol,
          controller: params1.controller,
        },
        contextMock.getMockInstance()
      );

      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        stub()
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

    test('should call error on inappropriate params address', async () => {
      // Instantiate SetController with incorrect args instead
      target = new SetController(
        {
          symbol: params1.symbol,
          controller: 'Inappropriate',
        },
        contextMock.getMockInstance()
      );

      // Real call rejects
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Controller address "Inappropriate" is invalid.`,
        })
      );
    });

    test('should throw if account address is different than owner address', async () => {
      securityTokenMock.mock('owner', Promise.resolve('0x01'));
      contextMock.set(
        'currentWallet',
        new Wallet({ address: () => Promise.resolve('0x02') })
      );

      // Instantiate SetController
      target = new SetController(
        {
          symbol: params1.symbol,
          controller: params1.controller,
        },
        contextMock.getMockInstance()
      );

      // Real call rejects
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the owner of this Security Token to set the controller`,
        })
      );
    });

    test('should send the transaction to set a controller', async () => {
      securityTokenMock.mock('owner', Promise.resolve('0x01'));
      contextMock.set(
        'currentWallet',
        new Wallet({ address: () => Promise.resolve('0x01') })
      );

      target = new SetController(
        {
          symbol: params1.symbol,
          controller: params1.controller,
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(
            securityTokenMock.getMockInstance().setController,
            {
              tag: PolyTransactionTag.SetController,
            }
          )
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });
  });
});
