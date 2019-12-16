import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { RemoveDocument } from '../../procedures/RemoveDocument';
import { Procedure } from '../../procedures/Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  RemoveDocumentProcedureArgs,
} from '../../types';
import { PolymathError } from '../../PolymathError';
import { Wallet } from '../../Wallet';

const params: RemoveDocumentProcedureArgs = {
  symbol: 'TEST1',
  name: 'Doc Name',
};

describe('RemoveDocument', () => {
  let target: RemoveDocument;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test RemoveDocument
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
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x02') }));
    securityTokenMock.set('owner', () => Promise.resolve('0x02'));
    securityTokenMock.set('getAllDocuments', () => Promise.resolve([params.name]));
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have RemoveDocument type', async () => {
      target = new RemoveDocument(params, contextMock.getMockInstance());
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.RemoveDocument);
    });
  });

  describe('RemoveDocument', () => {
    test('should throw if there is no valid security token being provided', async () => {
      // Instantiate RemoveDocument with incorrect security symbol
      target = new RemoveDocument(params, contextMock.getMockInstance());

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

    test('should throw if the document name is too large', async () => {
      // Instantiate RemoveDocument
      target = new RemoveDocument(
        {
          ...params,
          name: 'abcdefghijklmnopqrstuvwxyzabcdefg',
        },
        contextMock.getMockInstance()
      );

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must provide a valid name between 1 and 32 characters long`,
        })
      );
    });

    test('should throw if the document name is empty', async () => {
      // Instantiate RemoveDocument
      target = new RemoveDocument(
        {
          ...params,
          name: '',
        },
        contextMock.getMockInstance()
      );

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must provide a valid name between 1 and 32 characters long`,
        })
      );
    });

    test('should throw if the document you are trying to remove does not exist in the security token document list', async () => {
      securityTokenMock.set('getAllDocuments', () => Promise.resolve(['RandomDoc']));

      // Instantiate RemoveDocument
      target = new RemoveDocument(params, contextMock.getMockInstance());

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The document you are trying to remove does not exist on this security token`,
        })
      );
    });

    test('should throw if account address is different than owner address', async () => {
      securityTokenMock.mock('owner', Promise.resolve('0x01'));

      // Instantiate RemoveDocument
      target = new RemoveDocument(params, contextMock.getMockInstance());

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the owner of this Security Token to remove a document`,
        })
      );
    });

    test('should add a transaction to the queue to remove a document on the security token', async () => {
      target = new RemoveDocument(params, contextMock.getMockInstance());

      const addTransactionSpy = spy(target, 'addTransaction');

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().removeDocument, {
            tag: PolyTransactionTag.RemoveDocument,
          })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });
  });
});
