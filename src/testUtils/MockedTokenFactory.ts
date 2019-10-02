import { SecurityToken_3_0_0, Web3Wrapper } from '@polymathnetwork/contract-wrappers';
import SecurityTokenRegistryWrapper from '@polymathnetwork/contract-wrappers/lib/contract_wrappers/registries/security_token_registry_wrapper';
import ERC20TokenWrapper from '@polymathnetwork/contract-wrappers/lib/contract_wrappers/tokens/erc20_wrapper';
import ContractFactory from '@polymathnetwork/contract-wrappers/lib/factories/contractFactory';

export abstract class MockedTokenFactory {
  public readonly web3Wrapper: Web3Wrapper;

  public contractFactory: ContractFactory;

  public securityTokenRegistry: SecurityTokenRegistryWrapper;

  public constructor(
    web3Wrapper: Web3Wrapper,
    securityTokenRegistry: SecurityTokenRegistryWrapper,
    contractFactory: ContractFactory
  ) {
    this.web3Wrapper = web3Wrapper;
    this.securityTokenRegistry = securityTokenRegistry;
    this.contractFactory = contractFactory;
  }

  public abstract getERC20TokenInstanceFromAddress(address: string): Promise<ERC20TokenWrapper>;

  public abstract getSecurityTokenInstanceFromAddress(
    address: string
  ): Promise<SecurityToken_3_0_0>;

  public async getSecurityTokenInstanceFromTicker(ticker: string): Promise<SecurityToken_3_0_0> {
    return new Promise<SecurityToken_3_0_0>(resolve => {});
  }
}
