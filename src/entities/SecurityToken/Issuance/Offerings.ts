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
  stableCoinAddresses: string[];
  customCurrency?: Partial<CustomCurrency>;
  allowPreIssuance?: boolean;
}

type OnlyEth =
  | [Currency.ETH]
  | [Currency.StableCoin, Currency.ETH]
  | [Currency.ETH, Currency.StableCoin];
type OnlyPoly =
  | [Currency.POLY]
  | [Currency.StableCoin, Currency.POLY]
  | [Currency.POLY, Currency.StableCoin];
type EthAndPoly =
  | [Currency.ETH, Currency.POLY]
  | [Currency.POLY, Currency.ETH]
  | [Currency.StableCoin, Currency.ETH, Currency.POLY]
  | [Currency.ETH, Currency.StableCoin, Currency.POLY]
  | [Currency.ETH, Currency.POLY, Currency.StableCoin]
  | [Currency.StableCoin, Currency.POLY, Currency.ETH]
  | [Currency.POLY, Currency.StableCoin, Currency.ETH]
  | [Currency.POLY, Currency.ETH, Currency.StableCoin];

interface LaunchTieredStoNoCustomCurrencyParams
  extends Omit<LaunchTieredStoParams, 'customCurrency'> {
  currencies: OnlyEth | OnlyPoly | EthAndPoly;
}

interface LaunchTieredStoCustomCurrencyEthParams extends LaunchTieredStoParams {
  currencies: OnlyEth;
  customCurrency: {
    currencySymbol?: string;
    ethOracleAddress: string;
  };
}

interface LaunchTieredStoCustomCurrencyPolyParams extends LaunchTieredStoParams {
  currencies: OnlyPoly;
  customCurrency: {
    currencySymbol?: string;
    polyOracleAddress: string;
  };
}

interface LaunchTieredStoCustomCurrencyBothParams extends LaunchTieredStoParams {
  currencies: EthAndPoly;
  customCurrency: {
    currencySymbol?: string;
    ethOracleAddress: string;
    polyOracleAddress: string;
  };
}

interface LaunchTieredStoMethod {
  (args: LaunchTieredStoNoCustomCurrencyParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs>
  >;
  (args: LaunchTieredStoCustomCurrencyEthParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs>
  >;
  (args: LaunchTieredStoCustomCurrencyPolyParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs>
  >;
  (args: LaunchTieredStoCustomCurrencyBothParams): Promise<
    TransactionQueue<LaunchTieredStoProcedureArgs>
  >;
}

interface GetStoMethod {
  (args: { stoType: StoType.Simple; address: string }): Promise<SimpleSto>;
  (args: { stoType: StoType.Tiered; address: string }): Promise<TieredSto>;
  (args: string): Promise<SimpleSto | TieredSto>;
}

export class Offerings extends SubModule {
  /**
   * Launch a Simple STO
   *
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tokensOnSale amount of tokens to be sold
   * @param rate amount of tokens an investor can purchase per unit of currency spent
   * @param currency currency in which the funds will be raised (ETH or POLY)
   * @param raisedFundsWallet wallet address that will receive the funds that are being raised
   * @param unsoldTokensWallet wallet address that will receive unsold tokens
   * @param allowPreIssuance whether to have all tokens issued on STO start. Default behavior is to issue on purchase
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
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tiers tier information
   * @param tiers[].tokensOnSale amount of tokens to be sold on that tier
   * @param tiers[].price price of each token on that tier
   * @param tiers[].tokensWithDiscount amount of tokens to be sold on that tier at a discount if paid in POLY (must be less than tokensOnSale, defaults to 0)
   * @param tiers[].discountedPrice price of discounted tokens on that tier (defaults to 0)
   * @param nonAccreditedInvestmentLimit maximum investment for non-accredited investors
   * @param minimumInvestment minimum investment amount
   * @param currencies array of currencies in which the funds will be raised (ETH, POLY, StableCoin)
   * @param raisedFundsWallet wallet address that will receive the funds that are being raised
   * @param unsoldTokensWallet wallet address that will receive unsold tokens when the end date is reached
   * @param stableCoinAddresses array of stable coins that the offering supports
   * @param customCurrency custom currency data. Allows the STO to raise funds pegged to a different currency. Optional, defaults to USD
   * @param customCurrency.currencySymbol symbol of the custom currency (USD, CAD, EUR, etc. Default is USD)
   * @param customCurrency.ethOracleAddress address of the oracle that states the price of ETH in the custom currency. Only required if raising funds in ETH
   * @param customCurrency.polyOracleAddress address of the oracle that states the price of POLY in the custom currency. Only required if raising funds in POLY
   * @param allowPreIssuance whether to have all tokens issued on STO start. Default behavior is to issue on purchase
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
   * @param stoType type of the STO (Capped or Tiered)
   * @param address address of the STO contract
   */
  public getSto: GetStoMethod = async (
    args:
      | {
          stoType: StoType;
          address: string;
        }
      | string
  ): Promise<any> => {
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
   * @param stoTypes array of types of STOs to fetch (optional, defaults to both)
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
