import { Provider } from '@polymathnetwork/contract-wrappers';
import {
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  RedundantSubprovider,
  RPCSubprovider,
} from '@0x/subproviders';
import { Context } from './Context';
import { getInjectedProvider } from './browserUtils';
import { PolymathNetworkParams, ErrorCode } from './types';
import { Erc20TokenBalance, SecurityToken } from './entities';

import { ReserveSecurityToken } from './procedures';
import { PolymathError } from './PolymathError';
import { PolymathBase } from './PolymathBase';

export class Polymath {
  public networkId: number = -1;

  public isUnsupported: boolean = false;

  public isConnected: boolean = false;

  public polymathRegistryAddress: string = '';

  private contractWrappers: PolymathBase = {} as PolymathBase;

  private context: Context = {} as Context;

  public connect = async ({
    polymathRegistryAddress,
    providerUrl,
    privateKey,
  }: PolymathNetworkParams) => {
    let contractWrappers: PolymathBase;
    let provider: Provider;
    const providerEngine = new Web3ProviderEngine();
    const injectedProvider = await getInjectedProvider();

    if (providerUrl && privateKey) {
      providerEngine.addProvider(new PrivateKeyWalletSubprovider(privateKey));
      providerEngine.addProvider(new RedundantSubprovider([new RPCSubprovider(providerUrl)]));
      provider = providerEngine;
    } else if (injectedProvider) {
      provider = injectedProvider;
    } else {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message:
          "You must supply a provider URL and private key to the connect method if you're not using Polymath SDK in a browser environment",
      });
    }

    contractWrappers = new PolymathBase({ provider, polymathRegistryAddress });

    this.contractWrappers = contractWrappers;

    const account = await contractWrappers.getAccount();

    this.context = new Context({
      contractWrappers,
      accountAddress: account,
    });

    this.isConnected = true;

    return this;
  };

  /**
   * Reserve a Security Token
   *
   * @param symbol Security Token symbol
   * @param owner address that will own the reservation (optional, use this if you want to reserve a token on behalf of someone else)
   */
  public reserveSecurityToken = async (args: { symbol: string; owner?: string }) => {
    const procedure = new ReserveSecurityToken(args, this.context);
    const transactionQueue = await procedure.prepare();
    return transactionQueue;
  };

  /**
   * Retrieve a security token by symbol or UUID
   *
   * @param symbol Security Token symbol
   */
  public getSecurityToken = async (
    args:
      | {
          symbol: string;
        }
      | string
  ) => {
    let symbol: string;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ symbol } = SecurityToken.unserialize(args));
    } else {
      ({ symbol } = args);
    }

    let securityToken;

    try {
      securityToken = await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const name = await securityToken.name();
    const owner = await securityToken.owner();
    const address = await securityToken.address();

    return new SecurityToken(
      {
        name,
        address,
        symbol,
        owner,
      },
      this.context
    );
  };

  /**
   * Check if a token follows the ERC20 standard
   *
   * @param address address of the token contract
   */
  public isValidErc20 = async (args: { address: string }) => {
    const { address } = args;
    const erc20Token = await this.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      address
    );
    return await erc20Token.isValidContract();
  };

  /**
   * Get the balance of a specific ERC20 token in a wallet
   *
   * @param tokenAddress address of the ERC20 token
   * @param wallet wallet to check for balance
   */
  public getErc20TokenBalance = async (
    args:
      | {
          tokenAddress: string;
          walletAddress: string;
        }
      | string
  ) => {
    let tokenAddress: string;
    let walletAddress: string;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ tokenAddress, walletAddress } = Erc20TokenBalance.unserialize(args));
    } else {
      ({ tokenAddress, walletAddress } = args);
    }

    const token = await this.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      tokenAddress
    );
    const [symbol, balance] = await Promise.all([
      token.symbol(),
      token.balanceOf({ owner: walletAddress }),
    ]);

    return new Erc20TokenBalance({
      tokenSymbol: symbol,
      tokenAddress,
      balance,
      walletAddress,
    });
  };

  /**
   * Get the current version of the Polymath Protocol
   */
  public getLatestProtocolVersion = async () => {
    return await this.contractWrappers.securityTokenRegistry.getLatestProtocolVersion();
  };
}
