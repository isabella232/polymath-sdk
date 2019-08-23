import { BigNumber, ModuleName } from '@polymathnetwork/contract-wrappers';
import { includes } from 'lodash';
import { SubModule } from './SubModule';
import { CappedStoCurrency, StoTier, Currency, StoType, ErrorCode } from '../../types';
import { LaunchCappedSto, LaunchUsdTieredSto } from '../../procedures';
import { CappedSto, UsdTieredSto, Sto } from '..';
import { PolymathError } from '../../PolymathError';

interface GetSto {
  (args: { stoType: StoType.Capped; address: string }): Promise<CappedSto>;
  (args: { stoType: StoType.UsdTiered; address: string }): Promise<UsdTieredSto>;
  (args: string): Promise<CappedSto | UsdTieredSto>;
}

export class Offerings extends SubModule {
  /**
   * Launch a Capped STO
   *
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tokensOnSale amount of tokens to be sold
   * @param rate amount of tokens an investor can purchase per unit of currency spent
   * @param currency currency in which the funds will be raised (ETH or POLY)
   * @param storageWallet wallet address that will receive the funds that are being raised
   *
   */
  public launchCappedSto = async (args: {
    startDate: Date;
    endDate: Date;
    tokensOnSale: BigNumber;
    rate: BigNumber;
    currency: CappedStoCurrency;
    storageWallet: string;
  }) => {
    const { context, securityToken } = this;
    const { symbol } = securityToken;
    const procedure = new LaunchCappedSto(
      {
        symbol,
        ...args,
      },
      context
    );
    return procedure.prepare();
  };

  /**
   * Launch a USD Tiered STO
   *
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tiers tier information
   * @param tiers[].tokensOnSale amount of tokens to be sold on that tier
   * @param tiers[].price price of each token on that tier in USD
   * @param tiers[].tokensWithDiscount amount of tokens to be sold on that tier at a discount if paid in POLY (must be less than tokensOnSale, defaults to 0)
   * @param tiers[].discountedPrice price of discounted tokens on that tier (defaults to 0)
   * @param nonAccreditedInvestmentLimit maximum investment for non-accredited investors
   * @param minimumInvestment minimum investment amount
   * @param currencies array of currencies in which the funds will be raised (ETH, POLY, StableCoin)
   * @param storageWallet wallet address that will receive the funds that are being raised
   * @param treasuryWallet wallet address that will receive unsold tokens when the end date is reached
   * @param usdTokenAddresses array of USD stable coins that the offering supports
   *
   */
  public launchUsdTieredSto = async (args: {
    startDate: Date;
    endDate: Date;
    tiers: StoTier[];
    nonAccreditedInvestmentLimit: BigNumber;
    minimumInvestment: BigNumber;
    currencies: Currency[];
    storageWallet: string;
    treasuryWallet: string;
    usdTokenAddresses: string[];
  }) => {
    const { context, securityToken } = this;
    const { symbol } = securityToken;
    const procedure = new LaunchUsdTieredSto(
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
   * @param stoType type of the STO (Capped or USDTiered)
   * @param address address of the STO contract
   */
  public getSto: GetSto = async (
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

    if (stoType === StoType.Capped) {
      return factories.cappedStoFactory.fetch(
        CappedSto.generateId({ securityTokenId: uid, stoType, address })
      );
    } else if (stoType === StoType.UsdTiered) {
      return factories.usdTieredStoFactory.fetch(
        UsdTieredSto.generateId({ securityTokenId: uid, stoType, address })
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
      stoTypes: [StoType.Capped, StoType.UsdTiered],
    }
  ) => {
    const { contractWrappers, factories } = this.context;

    const { symbol: securityTokenSymbol, uid } = this.securityToken;

    const { stoTypes } = opts;

    let stos: Promise<CappedSto | UsdTieredSto>[] = [];

    if (includes(stoTypes, StoType.Capped)) {
      const fetchedModules = await contractWrappers.getAttachedModules(
        { symbol: securityTokenSymbol, moduleName: ModuleName.CappedSTO },
        { unarchived: true }
      );

      const addresses = await Promise.all(fetchedModules.map(module => module.address()));

      stos = stos.concat(
        addresses.map(address =>
          factories.cappedStoFactory.fetch(
            CappedSto.generateId({ address, stoType: StoType.Capped, securityTokenId: uid })
          )
        )
      );
    }

    if (includes(stoTypes, StoType.UsdTiered)) {
      const fetchedModules = await contractWrappers.getAttachedModules(
        { symbol: securityTokenSymbol, moduleName: ModuleName.UsdTieredSTO },
        { unarchived: true }
      );

      const addresses = await Promise.all(fetchedModules.map(module => module.address()));

      stos = stos.concat(
        addresses.map(address =>
          factories.usdTieredStoFactory.fetch(
            UsdTieredSto.generateId({ address, stoType: StoType.Capped, securityTokenId: uid })
          )
        )
      );
    }

    return Promise.all(stos);
  };
}
