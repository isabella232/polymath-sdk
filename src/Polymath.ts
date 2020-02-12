import { Provider, BigNumber } from '@polymathnetwork/contract-wrappers';
import {
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  RedundantSubprovider,
  RPCSubprovider,
} from '@0x/subproviders';
import P from 'bluebird';
import phin from 'phin';
import { union, compact, chunk } from 'lodash';
import { Context } from './Context';
import { getInjectedProvider } from './browserUtils';
import { ErrorCode, TransactionSpeed, Version } from './types';
import { SecurityToken, Wallet } from './entities';
import { ReserveSecurityToken } from './procedures';
import { PolymathError } from './PolymathError';
import { PolymathBase } from './PolymathBase';
import { convertVersionToEnum } from './utils';

interface PolymathNetworkParams {
  polymathRegistryAddress?: string;
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

interface SymbolParams {
  symbol: string;
}

interface AddressParams {
  address: string;
}

interface GetSecurityToken {
  (params: SymbolParams): Promise<SecurityToken>;
  (params: AddressParams): Promise<SecurityToken>;
  (params: string): Promise<SecurityToken>;
}

/**
 * @hidden
 * Estimates the gas price to use in transactions
 *
 * @param speed - speed at which transactions should be mined
 * @param basePrice - base to multiply depending on the desired speed
 */
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

/**
 * Main entry point of the Polymath SDK
 */
export class Polymath {
  public isUnsupported: boolean = false;

  public isConnected: boolean = false;

  private context: Context = {} as Context;

  /**
   * Connects the client to an Ethereum node
   */
  public connect: Connect = async ({
    /**
     * address of a custom Polymath Registry contract. Defaults to the one deployed by Polymath
     */
    polymathRegistryAddress,
    /**
     * URL of an Ethereum node. If using Metamask, this parameter can be ignored
     */
    providerUrl,
    /**
     * private key of the wallet that will sign transactions. If using Metamask, this parameter can be ignored
     */
    privateKey,
    /**
     * desired transaction speed. More gas is spent if a faster speed is chosen
     */
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
   * @param symbol - Security Token symbol
   * @param owner - address that will own the reservation (optional, use this if you want to reserve a token on behalf of someone else)
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
   * @param owner - issuer's address (defaults to current address)
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

    const reservations = await P.map(symbols, symbol =>
      P.resolve(this.getSecurityTokenReservation({ symbol })).catch(PolymathError, err => {
        if (err.code === ErrorCode.FetcherValidationError) {
          return undefined;
        }

        throw err;
      })
    );

    return compact(reservations);
  };

  /**
   * Retrieve a Security Token Reservation by symbol or UUID
   *
   * @param symbol - Security Token symbol
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
   * Retrieve all launched Security Tokens related to a wallet.
   * This includes tokens owned by the wallet and tokens for which the wallet holds some role
   *
   * **Ignores** all tokens with version 2.0 or lower
   *
   * NOTE: This method is extremely slow if the wallet in question owns more than 20 tokens.
   * If that is your case, use [[getSecurityTokenSymbols]]
   *
   * @param walletAddress - defaults to current address
   */
  public getSecurityTokens = async (args?: { walletAddress: string }) => {
    const {
      context: { currentWallet, contractWrappers },
    } = this;

    let walletAddress: string;
    if (args) {
      ({ walletAddress } = args);
    } else {
      walletAddress = await currentWallet.address();
    }

    const [ownedAddresses, delegatedAddresses] = await Promise.all([
      contractWrappers.securityTokenRegistry.getTokensByOwner({ owner: walletAddress }),
      contractWrappers.securityTokenRegistry.getTokensByDelegate(walletAddress),
    ]);

    const addressChunks = chunk(union(ownedAddresses, delegatedAddresses), 10);

    const result = await P.mapSeries(addressChunks, addresses =>
      P.map(addresses, address =>
        P.resolve(this.getSecurityToken({ address })).catch(PolymathError, err => {
          if (err.code === ErrorCode.IncorrectVersion) {
            return undefined;
          }

          throw err;
        })
      )
    );

    return compact(union(...result));
  };

  /**
   * Retrieve the symbols of all launched Security Tokens related to a wallet.
   * This includes tokens owned by the wallet and tokens for which the wallet holds some role
   *
   * **Includes** token symbols for tokens with version 2.0 or lower
   *
   * @param walletAddress - defaults to current address
   */
  public getSecurityTokenSymbols = async (args?: { walletAddress: string }) => {
    const {
      context: { currentWallet, contractWrappers },
    } = this;

    let walletAddress: string;
    if (args) {
      ({ walletAddress } = args);
    } else {
      walletAddress = await currentWallet.address();
    }

    const [ownedTickers, delegatedAddresses] = await Promise.all([
      contractWrappers.securityTokenRegistry.getTickersByOwner({ owner: walletAddress }),
      contractWrappers.securityTokenRegistry.getTokensByDelegate(walletAddress),
    ]);

    const delegateTickers = await P.map(delegatedAddresses, async address => {
      const details = await contractWrappers.securityTokenRegistry.getSecurityTokenData({
        securityTokenAddress: address,
      });
      return details.ticker;
    });

    return union(ownedTickers, delegateTickers);
  };

  /**
   * Retrieve a security token by symbol, address or UUID
   *
   * @throws if the Security Token is v2.0 or lower
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

    // eslint-disable-next-line require-jsdoc
    const isAddressArgs = (a: any): a is { address: string } => {
      return typeof a.address === 'string';
    };

    const {
      context: {
        contractWrappers: { tokenFactory },
        factories,
      },
    } = this;

    let securityToken;

    // fetch by UUID
    if (typeof args === 'string') {
      const { symbol } = SecurityToken.unserialize(args);
      securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
      uid = args;
    } else if (isAddressArgs(args)) {
      const { address } = args;
      try {
        securityToken = await tokenFactory.getSecurityTokenInstanceFromAddress(address);

        const symbol = await securityToken.symbol();
        uid = SecurityToken.generateId({ symbol });
      } catch (err) {
        throw new PolymathError({
          code: ErrorCode.FetcherValidationError,
          message: `There is no Security Token with address ${address}`,
        });
      }
    } else {
      securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(args.symbol);
      uid = SecurityToken.generateId(args);
    }

    const versionArray = await securityToken.getVersion();

    const versionError = new PolymathError({
      code: ErrorCode.IncorrectVersion,
      message: 'Security Token v2.0 not supported',
    });

    try {
      const version = convertVersionToEnum(versionArray);

      if (![Version.V3_0_0, Version.V3_1_0].includes(version)) {
        throw versionError;
      }
    } catch (err) {
      throw versionError;
    }

    return factories.securityTokenFactory.fetch(uid);
  };

  /**
   * Check if a token symbol (ticker) is available for reservation
   *
   * @param symbol - Security Token symbol for which to check availability
   */
  public isSymbolAvailable = async (args: { symbol: string }) => {
    const { symbol } = args;

    return this.context.contractWrappers.securityTokenRegistry.tickerAvailable({ ticker: symbol });
  };

  /**
   * Check if a token follows the ERC20 standard
   *
   * @param address - address of the token contract
   */
  public isValidErc20 = async (args: { address: string }) => {
    const { address } = args;
    const { context } = this;
    const erc20Token = await context.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      address
    );
    await erc20Token.isValidContract();
  };

  /**
   * Retrieve a Wallet by address
   *
   * @param address - wallet address
   */
  public getWallet = (args: { address: string }): Wallet => {
    const { address } = args;

    return new Wallet({ address }, this.context);
  };

  /**
   * Get the current version of the Polymath Protocol
   *
   * @returns version string (i.e. 3.0.0)
   */
  public getLatestProtocolVersion = async () => {
    const {
      context: { contractWrappers },
    } = this;
    const version = await contractWrappers.securityTokenRegistry.getLatestProtocolVersion();

    return version.map(vNum => vNum.toNumber()).join('.');
  };

  /**
   * Get the address of the POLY token
   */
  public getPolyTokenAddress = async () => {
    const { contractWrappers } = this.context;

    return contractWrappers.polyToken.address();
  };

  /**
   * Returns the wallet address of the current user
   */
  public getCurrentAddress = async () => {
    const { currentWallet } = this.context;

    return currentWallet.address();
  };

  /**
   * @hidden
   * Obtains a recommended default gas price based on the desired transaction speed
   *
   * On mainnet, the gas price is fetched from ethgasstation.info (most reliable)
   *
   * On testnets (or if ethgasstation is unavailable), the gas price is fetched from the network itself via eth_gasPrice
   * If everything else fails, we use a base default of 1 GWEI
   *
   * On the last two cases, the obtained price is multiplied by a factor depending on the speed:
   *
   * - Slow = x1
   * - Medium = x2
   * - Fast = x3
   * - Fastest = x5
   */
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
          case TransactionSpeed.Fast: {
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
        // Do nothing, fall back to asking the network
      }
    }

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
  };
}
