import { Provider } from '@polymathnetwork/contract-wrappers';
import {
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  RedundantSubprovider,
  RPCSubprovider,
} from '@0x/subproviders';
import P from 'bluebird';
import { Context } from './Context';
import { getInjectedProvider } from './browserUtils';
import { ErrorCode } from './types';
import { Erc20TokenBalance, SecurityToken, SecurityTokenReservation } from './entities';
import { ReserveSecurityToken } from './procedures';
import { PolymathError } from './PolymathError';
import { PolymathBase } from './PolymathBase';

interface PolymathNetworkParams {
  polymathRegistryAddress: string;
}

interface PolymathNetworkNodeParams extends PolymathNetworkParams {
  providerUrl: string;
  privateKey: string;
}

interface ConnectParams extends PolymathNetworkParams {
  providerUrl?: string;
  privateKey?: string;
}

interface Connect {
  (params: PolymathNetworkParams): Promise<Polymath>;
  (params: PolymathNetworkNodeParams): Promise<Polymath>;
}

/**
 * @param symbol Security Token symbol
 */
interface SymbolParams {
  symbol: string;
}

/**
 * @param address Address of the Security Token contract
 */
interface AddressParams {
  address: string;
}

interface GetSecurityToken {
  (params: SymbolParams): Promise<SecurityToken>;
  (params: AddressParams): Promise<SecurityToken>;
  (params: string): Promise<SecurityToken>;
}

function isSymbolParams(params: any): params is SymbolParams {
  return typeof params === 'object' && typeof params.symbol === 'string';
}

export class Polymath {
  public networkId: number = -1;

  public isUnsupported: boolean = false;

  public isConnected: boolean = false;

  public polymathRegistryAddress: string = '';

  private context: Context = {} as Context;

  public connect: Connect = async ({
    polymathRegistryAddress,
    providerUrl,
    privateKey,
  }: ConnectParams) => {
    let provider: Provider;
    const providerEngine = new Web3ProviderEngine();
    const injectedProvider = await getInjectedProvider();

    if (providerUrl && privateKey) {
      providerEngine.addProvider(new PrivateKeyWalletSubprovider(privateKey));
      providerEngine.addProvider(new RedundantSubprovider([new RPCSubprovider(providerUrl)]));
      providerEngine.start();
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

    const contractWrappers = new PolymathBase({ provider, polymathRegistryAddress });

    this.context = new Context({
      contractWrappers,
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
   * Retrieve all Security Token Reservations currently owned by an issuer. This includes
   * Security Tokens that have already been launched
   *
   * @param owner issuer's address (defaults to current address)
   */
  public getSecurityTokenReservations = async (args?: { owner: string }) => {
    const {
      context: { currentWallet, contractWrappers },
    } = this;

    let owner: string;
    if (args) {
      ({ owner } = args);
    } else {
      owner = await currentWallet.address();
    }

    const symbols = await contractWrappers.securityTokenRegistry.getTickersByOwner({ owner });

    return P.map(symbols, symbol => {
      return this.getSecurityTokenReservation({ symbol });
    });
  };

  /**
   * Retrieve a Security Token Reservation by symbol or UUID
   *
   * @param symbol Security Token symbol
   */
  public getSecurityTokenReservation = async (args: { symbol: string } | string) => {
    let uid: string;

    // fetch by UUID
    if (typeof args === 'string') {
      uid = args;
    } else {
      uid = SecurityToken.generateId(args);
    }

    return this.context.factories.securityTokenReservationFactory.fetch(uid);
  };

  /**
   * Retrieve all launched Security Tokens currently owned by an issuer
   *
   * @param owner issuer's address (defaults to current address)
   */
  public getSecurityTokens = async (args?: { owner: string }) => {
    const {
      context: { currentWallet, contractWrappers },
    } = this;

    let owner: string;
    if (args) {
      ({ owner } = args);
    } else {
      owner = await currentWallet.address();
    }

    const addresses = await contractWrappers.securityTokenRegistry.getTokensByOwner({ owner });

    return P.map(addresses, address => {
      return this.getSecurityToken({ address });
    });
  };

  /**
   * Retrieve a security token by symbol, address or UUID
   */
  public getSecurityToken: GetSecurityToken = async (
    args:
      | {
          symbol: string;
        }
      | {
          address: string;
        }
      | string
  ) => {
    let uid: string;

    const isAddressArgs = (a: any): a is { address: string } => {
      return typeof a.address === 'string';
    };

    // fetch by UUID
    if (typeof args === 'string') {
      uid = args;
    } else if (isAddressArgs(args)) {
      const { address } = args;
      try {
        const securityToken = await this.context.contractWrappers.tokenFactory.getSecurityTokenInstanceFromAddress(
          address
        );

        const symbol = await securityToken.symbol();
        uid = SecurityToken.generateId({ symbol });
      } catch (err) {
        throw new PolymathError({
          code: ErrorCode.FetcherValidationError,
          message: `There is no Security Token with address ${address}`,
        });
      }
    } else {
      uid = SecurityToken.generateId(args);
    }

    return this.context.factories.securityTokenFactory.fetch(uid);
  };

  /**
   * Check if a token follows the ERC20 standard
   *
   * @param address address of the token contract
   */
  public isValidErc20 = async (args: { address: string }) => {
    const { address } = args;
    const erc20Token = await this.context.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      address
    );
    await erc20Token.isValidContract();
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
    let uid: string;

    // fetch by UUID
    if (typeof args === 'string') {
      uid = args;
    } else {
      uid = Erc20TokenBalance.generateId(args);
    }

    return this.context.factories.erc20TokenBalanceFactory.fetch(uid);
  };

  /**
   * Get the current version of the Polymath Protocol
   */
  public getLatestProtocolVersion = async () => {
    await this.context.contractWrappers.securityTokenRegistry.getLatestProtocolVersion();
  };

  /**
   * Returns the wallet address of the current user
   */
  public getCurrentAddress = async () => {
    const { currentWallet } = this.context;

    return currentWallet.address();
  };
}
