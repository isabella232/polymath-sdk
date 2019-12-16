import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as createCheckpointProcedure from '../../procedures/CreateCheckpoint';
import { Shareholders } from '../../entities/SecurityToken/Shareholders';
import { SubModule } from '../../entities/SecurityToken/SubModule';
import { SecurityToken } from '../SecurityToken';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
  tokenDetails: 'details',
  version: [new BigNumber(1)],
  granularity: 3,
  totalSupply: new BigNumber(1000),
  currentCheckpoint: 2,
  treasuryWallet: '0x3',
};

describe('Shareholders', () => {
  let target: Shareholders;
  let createCheckpointMock: MockManager<createCheckpointProcedure.CreateCheckpoint>;

  beforeAll(() => {
    // Generate the mock for CreateCheckpoint
    createCheckpointMock = ImportMock.mockClass(createCheckpointProcedure, 'CreateCheckpoint');

    // Generate a mock for context, and a security token to instantiate Shareholders
    const contextMock = ImportMock.mockClass(contextModule, 'Context');
    const st1 = new SecurityToken(params1, contextMock.getMockInstance());

    // Instantiate Shareholders
    target = new Shareholders(st1, contextMock.getMockInstance());
  });

  describe('Types', () => {
    test('should extend Submodule', async () => {
      expect(target instanceof SubModule).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      // Setup the mock on prepare
      const prepareCreateCheckpointStub = createCheckpointMock.mock('prepare', {});

      // Real call
      await target.createCheckpoint();

      // Verifications
      expect(sinon.spy(target, 'createCheckpoint').calledOnce);
      expect(prepareCreateCheckpointStub.calledOnce);
    });
  });
});
