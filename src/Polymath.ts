import { Provider, BigNumber } from '@polymathnetwork/contract-wrappers';
import {
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  RedundantSubprovider,
  RPCSubprovider,
} from '@0x/subproviders';
import P from 'bluebird';
import phin from 'phin';
import { Context } from './Context';
import { getInjectedProvider } from './browserUtils';
import { ErrorCode, TransactionSpeed } from './types';
import { Erc20TokenBalance, SecurityToken } from './entities';
import { ReserveSecurityToken } from './procedures';
import { PolymathError } from './PolymathError';
import { PolymathBase } from './PolymathBase';

interface PolymathNetworkParams {
  polymathRegistryAddress: string;
  speed?: TransactionSpeed;
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

export class Polymath {
  public isUnsupported: boolean = false;

  public isConnected: boolean = false;

  public polymathRegistryAddress: string = '';

  private context: Context = {} as Context;

  public connect: Connect = async ({
    polymathRegistryAddress,
    providerUrl,
    privateKey,
    speed = TransactionSpeed.Fast,
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

    const slowDefaultGasPrice = new BigNumber(10).exponentiatedBy(9);

    let contractWrappers = new PolymathBase({
      provider,
      polymathRegistryAddress,
    });

    const isTestnet = await contractWrappers.isTestnet();
    const defaultGasPrice = await this.getGasPrice({
      provider,
      isTestnet,
      defaultPrice: slowDefaultGasPrice,
      speed,
    });

    contractWrappers = new PolymathBase({
      provider,
      polymathRegistryAddress,
      defaultGasPrice,
    });

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
   * Check if a token symbol (ticker) is available for reservation
   *
   * @param symbol security token symbol for which to check availability
   */
  public isSymbolAvailable = async (args: { symbol: string }) => {
    const { symbol } = args;

    return this.context.contractWrappers.securityTokenRegistry.tickerAvailable({ ticker: symbol });
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
   * Get the balance of ETH in a wallet
   *
   * @param walletAddress wallet to check for balance
   */
  public getEthBalance = async (args: { walletAddress: string }) => {
    const { walletAddress } = args;

    return this.context.contractWrappers.getBalance({ address: walletAddress });
  };

  /**
   * Get the balance of a specific ERC20 token in a wallet
   *
   * @param tokenAddress address of the ERC20 token
   * @param walletAddress wallet to check for balance
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
   *
   * @returns version string (i.e. 3.0.0)
   */
  public getLatestProtocolVersion = async () => {
    const version = await this.context.contractWrappers.securityTokenRegistry.getLatestProtocolVersion();

    return version.map(vNum => vNum.toNumber()).join('.');
  };

  /**
   * Returns the wallet address of the current user
   */
  public getCurrentAddress = async () => {
    const { currentWallet } = this.context;

    return currentWallet.address();
  };

  private getGasPrice = async ({
    provider,
    isTestnet,
    defaultPrice,
    speed,
  }: {
    provider: Provider;
    isTestnet: boolean;
    defaultPrice: BigNumber;
    speed: TransactionSpeed;
  }) => {
    if (!isTestnet) {
      try {
        const gasResponse = await phin({
          url: 'https://ethgasstation.info/json/ethgasAPI.json',
          parse: 'json',
        });

        const body = gasResponse.body as {
          fast: number;
          fastest: number;
          safeLow: number;
          average: number;
        };

        let gasPrice = body.fast;

        switch (speed) {
          case TransactionSpeed.Slow: {
            gasPrice = body.safeLow;
            break;
          }
          case TransactionSpeed.Medium: {
            gasPrice = body.average;
            break;
          }
          case TransactionSpeed.Fastest: {
            break;
          }
          case TransactionSpeed.Fastest: {
            gasPrice = body.fastest;
            break;
          }
          default: {
            throw new PolymathError({
              code: ErrorCode.FatalError,
              message: 'Invalid transaction speed parameter',
            });
          }
        }

        return new BigNumber(gasPrice).multipliedBy(new BigNumber(10).exponentiatedBy(8));
      } catch (err) {
        return calculateGasPrice(speed, defaultPrice);
      }
    } else {
      const networkGasPrice = await new Promise<BigNumber>((resolve, reject) => {
        try {
          provider.sendAsync(
            {
              jsonrpc: '2.0',
              id: new Date().getTime(),
              params: [],
              method: 'eth_gasPrice',
            },
            (err, resp) => {
              if (err) {
                reject(err);
              } else if (!resp) {
                resolve(defaultPrice);
              } else {
                const price = parseInt(resp.result, 16);
                resolve(new BigNumber(price));
              }
            }
          );
        } catch (err) {
          resolve(defaultPrice);
        }
      });

      return calculateGasPrice(speed, networkGasPrice);
    }
  };
}

const calculateGasPrice = (speed: TransactionSpeed, basePrice: BigNumber) => {
  let result = basePrice;
  switch (speed) {
    case TransactionSpeed.Slow: {
      break;
    }
    case TransactionSpeed.Medium: {
      result = basePrice.multipliedBy(2);
      break;
    }
    case TransactionSpeed.Fast: {
      result = basePrice.multipliedBy(3);
      break;
    }
    case TransactionSpeed.Fastest: {
      result = basePrice.multipliedBy(5);
      break;
    }
    default: {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: 'Invalid transaction speed parameter',
      });
    }
  }

  return result;
};
