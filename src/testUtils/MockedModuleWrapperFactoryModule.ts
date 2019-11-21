import {
  BlacklistTransferManager_3_0_0,
  CappedSTO_3_0_0,
  CappedSTO_3_1_0,
  CountTransferManager_3_0_0,
  ERC20DividendCheckpoint_3_0_0,
  EtherDividendCheckpoint_3_0_0,
  GeneralPermissionManager_3_0_0,
  GeneralPermissionManager_3_1_0,
  GeneralTransferManager_3_0_0,
  GeneralTransferManager_3_1_0,
  LockUpTransferManager_3_0_0,
  ManualApprovalTransferManager_3_0_0,
  ModuleFactory_3_0_0,
  PercentageTransferManager_3_0_0,
  RestrictedPartialSaleTransferManager_3_1_0,
  SecurityToken_3_0_0,
  USDTieredSTO_3_0_0,
  USDTieredSTO_3_1_0,
  VestingEscrowWallet_3_0_0,
  VestingEscrowWallet_3_1_0,
  VolumeRestrictionTransferManager_3_0_0,
  Web3Wrapper,
} from '@polymathnetwork/contract-wrappers';
import ContractFactory from '@polymathnetwork/contract-wrappers/lib/factories/contractFactory';

export abstract class MockedModuleWrapperFactoryModule {
  public readonly web3Wrapper: Web3Wrapper;

  public contractFactory: ContractFactory;

  public constructor(web3Wrapper: Web3Wrapper, contractFactory: ContractFactory) {
    this.web3Wrapper = web3Wrapper;
    this.contractFactory = contractFactory;
  }

  public async getModuleFactory(ticker: string): Promise<ModuleFactory_3_0_0> {
    return {} as Promise<ModuleFactory_3_0_0>;
  }

  public abstract getModuleInstance(): any;
}
