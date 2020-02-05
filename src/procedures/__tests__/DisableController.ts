import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { spy, stub, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { DisableController } from '../../procedures/DisableController';
import { Procedure } from '../Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DisableControllerProcedureArgs,
} from '../../types';
import { PolymathError } from '../../PolymathError';
import { Wallet } from '../../Wallet';

const params: DisableControllerProcedureArgs = {
  symbol: 'TEST1',
};

const ownerAddress = '0x01';
const randomSignature = 'Random disable controller signature ack';

describe('DisableController', () => {
  let target: DisableController;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, tokenFactory and securityToken to test DisableController
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
    securityTokenMock.mock('owner', Promise.resolve(ownerAddress));
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(ownerAddress) }));

    securityTokenMock.mock('isControllable', true);

    target = new DisableController(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have DisableController type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.DisableController);
    });
  });

  describe('DisableController', () => {
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

    test('should throw error if the security token is not controllable', async () => {
      securityTokenMock.mock('isControllable', false);

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'The controller has already been disabled permanently',
        })
      );
    });

    test('should throw if wallet address is different than owner address', async () => {
      contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve('0x02') }));

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the owner of this Security Token to disable the controller`,
        })
      );
    });

    test('should add a transaction to the queue to disable controller of the security token, without passing in a signature', async () => {
      const disableControllerArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('disableController', 'DisableController');
      const { disableController } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(disableController).returns(disableControllerArgsSpy);

      const addSignatureRequestArgsStub = sinon.stub();
      addSignatureRequestArgsStub.returns(Promise.resolve(randomSignature));
      const addSignatureRequestStub = stub(target, 'addSignatureRequest');

      securityTokenMock.mock('signDisableControllerAck', randomSignature);
      addSignatureRequestStub
        .withArgs(securityTokenMock.getMockInstance().signDisableControllerAck)
        .returns(addSignatureRequestArgsStub);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(disableControllerArgsSpy.getCall(0).args[0]).toEqual({
        signature: randomSignature,
      });
      expect(disableControllerArgsSpy.callCount).toEqual(1);
      expect(addSignatureRequestArgsStub.getCall(0).args[0]).toEqual({});
      expect(addSignatureRequestArgsStub.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().disableController, {
            tag: PolyTransactionTag.DisableController,
          })
      ).toEqual(true);
      expect(addTransactionStub.callCount).toEqual(1);

      expect(
        addSignatureRequestStub
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().signDisableControllerAck)
      ).toEqual(true);
      expect(addSignatureRequestStub.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to disable controller of the security token, passing in your own hex signature', async () => {
      target = new DisableController(
        { ...params, signature: randomSignature },
        contextMock.getMockInstance()
      );
      const disableControllerArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('disableController', 'DisableController');
      const { disableController } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(disableController).returns(disableControllerArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(disableControllerArgsSpy.getCall(0).args[0]).toEqual({
        signature: randomSignature,
      });
      expect(disableControllerArgsSpy.callCount).toEqual(1);
      expect(
        addTransactionStub
          .getCall(0)
          .calledWithExactly(securityTokenMock.getMockInstance().disableController, {
            tag: PolyTransactionTag.DisableController,
          })
      ).toEqual(true);
      expect(addTransactionStub.callCount).toEqual(1);
    });
  });
});
