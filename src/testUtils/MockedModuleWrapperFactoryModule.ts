import { ModuleFactory_3_0_0, Web3Wrapper } from '@polymathnetwork/contract-wrappers';
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
