/**
 * @packageDocumentation
 * @module Entities.SecurityToken.Issuance
 */

import { BigNumber, ModuleName } from '@polymathnetwork/contract-wrappers';
import { includes } from 'lodash';
import { SubModule } from '../SubModule';
import {
  StoTier,
  Currency,
  StoType,
  ErrorCode,
  CustomCurrency,
  LaunchTieredStoProcedureArgs,
  Omit,
} from '../../../types';
import { LaunchSimpleSto, LaunchTieredSto } from '../../../procedures';
import { SimpleSto, TieredSto, Sto } from '../..';
import { PolymathError } from '../../../PolymathError';
import { TransactionQueue } from '../../TransactionQueue';

interface LaunchTieredStoParams {
  startDate: Date;
  endDate: Date;
  tiers: StoTier[];
  nonAccreditedInvestmentLimit: BigNumber;
  minimumInvestment: BigNumber;
  currencies: Currency[];
  raisedFundsWallet: string;
  unsoldTokensWallet: string;
  stableCoinAddresses?: string[];
  customCurrency?: Partial<CustomCurrency>;
  allowPreIssuance?: boolean;
}

type OnlyEth = [Currency.ETH];
type EthAndStableCoin = [Currency.StableCoin, Currency.ETH] | [Currency.ETH, Currency.StableCoin];
type OnlyPoly = [Currency.POLY];
type PolyAndStableCoin =
  | [Currency.StableCoin, Currency.POLY]
  | [Currency.POLY, Currency.StableCoin];
type EthAndPoly = [Currency.ETH, Currency.POLY] | [Currency.POLY, Currency.ETH];
type AllCurrencies =
  | [Currency.StableCoin, Currency.ETH, Currency.POLY]
  | [Currency.ETH, Currency.StableCoin, Currency.POLY]
  | [Currency.ETH, Currency.POLY, Currency.StableCoin]
  | [Currency.StableCoin, Currency.POLY, Currency.ETH]
  | [Currency.POLY, Currency.StableCoin, Currency.ETH]
  | [Currency.POLY, Currency.ETH, Currency.StableCoin];

/**
 * Params for [[getSto]]
 */
export interface GetStoParams {
  stoType: StoType;
  address: string;
}

interface LaunchTieredStoNoCustomCurrencyNoStableCoinParams
  extends Omit<Omit<LaunchTieredStoParams, 'customCurrency'>, 'stableCoinAddresses'> {
  currencies: OnlyEth | OnlyPoly | EthAndPoly;
}

interface LaunchTieredStoNoCustomCurrencyParams
  extends Omit<LaunchTieredStoParams, 'customCurrency'> {
  currencies: EthAndStableCoin | PolyAndStableCoin | AllCurrencies;
  stableCoinAddresses: string[];
}

interface LaunchTieredStoCustomCurrencyEthParams extends LaunchTieredStoParams {
  currencies: OnlyEth | EthAndStableCoin;
  customCurrency: {
    currencySymbol?: string;
    ethOracleAddress: string;
  };
  stableCoinAddresses: string[];
}

interface LaunchTieredStoCustomCurrencyEthNoStableCoinParams
  extends Omit<LaunchTieredStoParams, 'stableCoinAddresses'> {
  currencies: OnlyEth;
  customCurrency: {
    currencySymbol?: string;
    ethOracleAddress: string;
  };
}

interface LaunchTieredStoCustomCurrencyPolyParams extends LaunchTieredStoParams {
  currencies: OnlyPoly | PolyAndStableCoin;
  customCurrency: {
    currencySymbol?: string;
    polyOracleAddress: string;
  };
  stableCoinAddresses: string[];
}

interface LaunchTieredStoCustomCurrencyPolyNoStableCoinParams
  extends Omit<LaunchTieredStoParams, 'stableCoinAddresses'> {
  currencies: OnlyPoly;
  customCurrency: {
    currencySymbol?: string;
    polyOracleAddress: string;
  };
}

interface LaunchTieredStoCustomCurrencyBothParams extends LaunchTieredStoParams {
  currencies: AllCurrencies;
  customCurrency: {
    currencySymbol?: string;
    ethOracleAddress: string;
    polyOracleAddress: string;
  };
  stableCoinAddresses: string[];
}

interface LaunchTieredStoCustomCurrencyBothNoStableCoinParams
  extends Omit<LaunchTieredStoParams, 'stableCoinAddresses'> {
  currencies: EthAndPoly;
  customCurrency: {
    currencySymbol?: string;
    ethOracleAddress: string;
    polyOracleAddress: string;
  };
}

interface LaunchTieredStoMethod {
  (args: LaunchTieredStoNoCustomCurrencyParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoNoCustomCurrencyNoStableCoinParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoCustomCurrencyEthParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoCustomCurrencyEthNoStableCoinParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoCustomCurrencyPolyParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoCustomCurrencyPolyNoStableCoinParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoCustomCurrencyBothParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
  (args: LaunchTieredStoCustomCurrencyBothNoStableCoinParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs, TieredSto>
  >;
}

interface GetStoMethod {
  (args: { stoType: StoType.Simple; address: string }): Promise<SimpleSto>;
  (args: { stoType: StoType.Tiered; address: string }): Promise<TieredSto>;
  (args: string): Promise<SimpleSto | TieredSto>;
}

/**
 * Namespace that handles all Offering related functionality
 */
export class Offerings extends SubModule {
  /**
   * Launch a Simple STO
   *
   * @param args.tokensOnSale - amount of tokens to be sold
   * @param args.rate - amount of tokens an investor can purchase per unit of currency spent
   * @param args.raisedFundsWallet - wallet address that will receive the funds that are being raised
   * @param args.unsoldTokensWallet - wallet address that will receive unsold tokens
   * @param args.allowPreIssuance - whether to have all tokens issued on STO start. Default behavior is to issue on purchase
   */
  public launchSimpleSto = async (args: {
    startDate: Date;
    endDate: Date;
    tokensOnSale: BigNumber;
    rate: BigNumber;
    currency: Currency.ETH | Currency.POLY;
    raisedFundsWallet: string;
    unsoldTokensWallet: string;
    allowPreIssuance?: boolean;
  }) => {
    const { context, securityToken } = this;
    const { symbol } = securityToken;
    const procedure = new LaunchSimpleSto(
      {
        symbol,
        ...args,
      },
      context
    );
    return procedure.prepare();
  };

  /**
   * Launch a Tiered STO
   *
   * @param args.tiers - array that specifies how many tokens to sell at each tier (along with their price and potential discounts)
   * @param args.nonAccreditedInvestmentLimit - maximum investment for non-accredited investors
   * @param args.minimumInvestment - minimum investment amount
   * @param args.currencies - array of currencies in which the funds will be raised (ETH, POLY, StableCoin)
   * @param args.raisedFundsWallet - wallet address that will receive the funds that are being raised
   * @param args.unsoldTokensWallet - wallet address that will receive unsold tokens when the end date is reached
   * @param args.stableCoinAddresses - array of stable coins that the offering supports
   * @param args.customCurrency - allows the STO to raise funds pegged to a different currency. Optional, defaults to USD
   * @param args.allowPreIssuance - whether to have all tokens issued on STO start. Default behavior is to issue on purchase
   */
  public launchTieredSto: LaunchTieredStoMethod = async (
    args: LaunchTieredStoParams
  ): Promise<any> => {
    const { context, securityToken } = this;
    const { symbol } = securityToken;
    const procedure = new LaunchTieredSto(
      {
        symbol,
        ...args,
      },
      context
    );
    return procedure.prepare();
  };

  /**
   * Retrieve an STO by type and address or UUID
   *
   * @param args - STO uuid or object containing its type and address
   */
  public getSto: GetStoMethod = async (args: GetStoParams | string): Promise<any> => {
    let stoType;
    let address;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ stoType, address } = Sto.unserialize(args));
    } else {
      ({ stoType, address } = args);
    }

    const {
      context: { factories },
      securityToken: { uid },
    } = this;

    if (stoType === StoType.Simple) {
      return factories.simpleStoFactory.fetch(
        SimpleSto.generateId({ securityTokenId: uid, stoType, address })
      );
    } else if (stoType === StoType.Tiered) {
      return factories.tieredStoFactory.fetch(
        TieredSto.generateId({ securityTokenId: uid, stoType, address })
      );
    } else {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `Invalid STO type "${stoType}"`,
      });
    }
  };

  /**
   * Retrieve all STOs attached to a security token
   *
   * @param stoTypes - optional, defaults to both
   */
  public getStos = async (
    opts: {
      stoTypes: StoType[];
    } = {
      stoTypes: [StoType.Simple, StoType.Tiered],
    }
  ) => {
    const { contractWrappers, factories } = this.context;

    const { symbol: securityTokenSymbol, uid } = this.securityToken;

    const { stoTypes } = opts;

    let stos: Promise<SimpleSto | TieredSto>[] = [];

    if (includes(stoTypes, StoType.Simple)) {
      const fetchedModules = await contractWrappers.getAttachedModules(
        { symbol: securityTokenSymbol, moduleName: ModuleName.CappedSTO },
        { unarchived: true }
      );

      const addresses = await Promise.all(fetchedModules.map(module => module.address()));

      stos = stos.concat(
        addresses.map(address =>
          factories.simpleStoFactory.fetch(
            SimpleSto.generateId({ address, stoType: StoType.Simple, securityTokenId: uid })
          )
        )
      );
    }

    if (includes(stoTypes, StoType.Tiered)) {
      const fetchedModules = await contractWrappers.getAttachedModules(
        { symbol: securityTokenSymbol, moduleName: ModuleName.UsdTieredSTO },
        { unarchived: true }
      );

      const addresses = await Promise.all(fetchedModules.map(module => module.address()));

      stos = stos.concat(
        addresses.map(address =>
          factories.tieredStoFactory.fetch(
            TieredSto.generateId({ address, stoType: StoType.Tiered, securityTokenId: uid })
          )
        )
      );
    }

    return Promise.all(stos);
  };
}
