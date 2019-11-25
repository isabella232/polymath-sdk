import { ImportMock, MockManager } from 'ts-mock-imports';
import { BigNumber, SecurityTokenRegistryEvents } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { spy, restore } from 'sinon';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as approvalModule from '../ApproveErc20';
import { ReserveSecurityToken } from '../../procedures/ReserveSecurityToken';
import { Procedure } from '../../procedures/Procedure';
import { Wallet } from '../../Wallet';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
  ReserveSecurityTokenProcedureArgs,
} from '../../types';
import { ApproveErc20 } from '../ApproveErc20';
import * as securityTokenReservationFactoryModule from '../../entities/factories/SecurityTokenReservationFactory';
import * as utilsModule from '../../utils';
import { mockFactories } from '../../testUtils/mockFactories';
import { SecurityTokenReservation } from '../../entities';
import { dateToBigNumber } from '../../utils';

const params: ReserveSecurityTokenProcedureArgs = {
  symbol: 'TEST1',
  owner: '0x3333333333333333333333333333333333333333',
};

const costInPoly = new BigNumber(5);
const costInUsd = new BigNumber(6);
const securityTokenRegistryAddress = '0x5555555555555555555555555555555555555555';
const currentWalletAddress = '0x4444444444444444444444444444444444444444';

describe('ReserveSecurityToken', () => {
  let target: ReserveSecurityToken;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let approvalMock: MockManager<approvalModule.ApproveErc20>;

  let securityTokenRegistryMock: MockManager<contractWrappersModule.SecurityTokenRegistry>;
  let securityTokenReservationFactoryMock: MockManager<
    securityTokenReservationFactoryModule.SecurityTokenReservationFactory
  >;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');

    // Import mock for approveErc20
    approvalMock = ImportMock.mockClass(approvalModule, 'ApproveErc20');
    approvalMock.mock('prepareTransactions', Promise.resolve());
    approvalMock.set('transactions' as any, []);
    approvalMock.set('fees' as any, []);

    securityTokenRegistryMock = ImportMock.mockClass(
      contractWrappersModule,
      'SecurityTokenRegistry'
    );

    securityTokenRegistryMock.mock('tickerAvailable', Promise.resolve(true));
    securityTokenRegistryMock.mock('isTickerRegisteredByCurrentIssuer', Promise.resolve(true));

    securityTokenRegistryMock.mock('getFees', Promise.resolve([costInUsd, costInPoly]));
    securityTokenRegistryMock.mock('address', Promise.resolve(securityTokenRegistryAddress));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());

    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(currentWalletAddress) })
    );

    wrappersMock.mock('isTestnet', Promise.resolve(false));

    securityTokenReservationFactoryMock = ImportMock.mockClass(
      securityTokenReservationFactoryModule,
      'SecurityTokenReservationFactory'
    );
    const factoryMockSetup = mockFactories();
    factoryMockSetup.securityTokenReservationFactory = securityTokenReservationFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate ReserveSecurityToken
    target = new ReserveSecurityToken(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ReserveSecurityToken type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ReserveSecurityToken);
    });
  });

  describe('CreateSecurityToken', () => {
    test('should throw if corresponding event for reserving security token is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Security Token was successfully reserved but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should throw if ticker being reserved is not available', async () => {
      securityTokenRegistryMock.mock('tickerAvailable', Promise.resolve(false));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          message: `Ticker ${params.symbol} has already been registered`,
          code: ErrorCode.ProcedureValidationError,
        })
      );
    });

    test('should return an object reflecting a reserved security token', async () => {
      const expiryDate = new Date(2035, 0);
      const reservedDate = new Date(2020, 0);
      const reservationObject = {
        expiry: dateToBigNumber(expiryDate),
        reservedAt: dateToBigNumber(reservedDate),
        ownerAddress: params.owner,
      };

      const createStub = securityTokenReservationFactoryMock.mock('create', reservationObject);
      const findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _ticker: params.symbol,
            _expiryDate: dateToBigNumber(expiryDate),
            _owner: params.owner,
            _registrationDate: dateToBigNumber(reservedDate),
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      const receipt = {} as TransactionReceiptWithDecodedLogs;
      await resolver.run(receipt);

      // Verifications
      expect(resolver.result).toEqual(reservationObject);
      expect(
        createStub
          .getCall(0)
          .calledWithExactly(SecurityTokenReservation.generateId({ symbol: params.symbol }), {
            expiry: expiryDate,
            reservedAt: reservedDate,
            ownerAddress: params.owner,
          })
      ).toEqual(true);
      expect(createStub.callCount).toBe(1);

      // Verifications for findEvents
      expect(
        findEventsStub.getCall(0).calledWithMatch({
          eventName: SecurityTokenRegistryEvents.RegisterTicker,
        })
      ).toEqual(true);
      expect(findEventsStub.callCount).toBe(1);
    });

    test('should add a transaction to the queue to reserve the security token, specifying an owner address', async () => {
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenRegistryMock.mock('registerNewTicker', Promise.resolve('RegisterNewTicker'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenRegistryMock.getMockInstance().registerNewTicker)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.fees).toEqual({
        usd: costInUsd,
        poly: costInPoly,
      });
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ReserveSecurityToken
      );
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to reserve the security token using the current wallet address as the owner address', async () => {
      target = new ReserveSecurityToken({ symbol: params.symbol }, contextMock.getMockInstance());
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenRegistryMock.mock('registerNewTicker', Promise.resolve('RegisterNewTicker'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenRegistryMock.getMockInstance().registerNewTicker)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.fees).toEqual({
        usd: costInUsd,
        poly: costInPoly,
      });
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ReserveSecurityToken
      );
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });
  });
});
