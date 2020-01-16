import { BigNumber, ModuleName } from '@polymathnetwork/contract-wrappers';
import { SubModule } from './SubModule';
import { TaxWithholdingEntry, ErrorCode } from '../../types';
import {
  CreateDividendDistribution,
  UpdateDividendsTaxWithholdingList,
  SetDividendsWallet,
  ModifyDividendsDefaultExclusionList,
} from '../../procedures';
import { Checkpoint } from '../Checkpoint';
import { PolymathError } from '../../PolymathError';
import { DividendDistribution } from '../DividendDistribution';
import { TaxWithholding } from '../TaxWithholding';

/**
 * Parameters of the [[getDistribution]] function
 */
export interface GetDistributionParams {
  /**
   * dividend distribution representation
   */
  dividendIndex: number;
}

/**
 * Namespace that handles all Dividend related functionality
 */
export class Dividends extends SubModule {
  /**
   * Distribute dividends in POLY
   *
   * @param args.checkpointId - uuid of the checkpoint to use as reference for the distribution
   * @param args.maturityDate - date from which dividends can be paid/collected
   * @param args.expiryDate - date up to which dividends can be paid/collected
   * @param args.amount - amount to be distributed
   * @param args.name - human readable name of the distribution
   * @param args.excludedAddresses - shareholder addresses that will be excluded from the distribution (optional)
   * @param args.taxWithholdings - array that specifies how much to withhold from each shareholder for tax purposes
   */
  public createPolyDistribution = async (args: {
    checkpointId: string;
    maturityDate: Date;
    expiryDate: Date;
    amount: BigNumber;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) => {
    const { context, securityToken } = this;
    const polyAddress = await context.contractWrappers.polyToken.address();
    const { checkpointId, ...rest } = args;
    const { symbol } = securityToken;
    const { index: checkpointIndex } = Checkpoint.unserialize(checkpointId);
    const procedure = new CreateDividendDistribution(
      {
        erc20Address: polyAddress,
        symbol,
        checkpointIndex,
        ...rest,
      },
      context
    );

    return procedure.prepare();
  };

  /**
   * Distribute dividends in a specified ERC20 token
   *
   * @param args.checkpointId - uuid of the checkpoint to use as reference for the distribution
   * @param args.maturityDate - date from which dividends can be paid/collected
   * @param args.expiryDate - date up to which dividends can be paid/collected
   * @param args.erc20Address - address of the ERC20 token that will be used as currency
   * @param args.amount - amount to be distributed
   * @param args.name - human readable name of the distribution
   * @param args.excludedAddresses - shareholder addresses that will be excluded from the distribution (optional)
   * @param args.taxWithholdings - array that specifies how much to withhold from each shareholder for tax purposes
   */
  public createErc20Distribution = async (args: {
    checkpointId: string;
    maturityDate: Date;
    expiryDate: Date;
    erc20Address: string;
    amount: BigNumber;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) => {
    const { context, securityToken } = this;
    const { checkpointId, ...rest } = args;
    const { symbol } = securityToken;
    const { index: checkpointIndex } = Checkpoint.unserialize(checkpointId);
    const procedure = new CreateDividendDistribution(
      {
        symbol,
        checkpointIndex,
        ...rest,
      },
      context
    );
    return procedure.prepare();
  };

  /**
   * Set default tax withtholding list for a type of dividends
   *
   * @param args.taxWithholdings - array that specifies how much to withhold from each shareholder for tax purposes
   */
  public modifyTaxWithholdingList = async (args: { taxWithholdings: TaxWithholdingEntry[] }) => {
    const { taxWithholdings, ...rest } = args;
    const { symbol } = this.securityToken;
    const shareholderAddresses: string[] = [];
    const percentages: number[] = [];
    taxWithholdings.forEach(({ address, percentage }) => {
      shareholderAddresses.push(address);
      percentages.push(percentage);
    });
    const procedure = new UpdateDividendsTaxWithholdingList(
      {
        symbol,
        shareholderAddresses,
        percentages,
        ...rest,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Change dividends storage wallet address
   *
   * @param args.address - new storage wallet address
   */
  public modifyStorageWallet = async (args: { address: string }) => {
    const { symbol } = this.securityToken;
    const procedure = new SetDividendsWallet(
      {
        symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Set default exclusion list for a type of dividends. Addresses on this list won't be considered for dividend distribution. This operation overrides the previous default exclusion list
   *
   * @param args.shareholderAddresses - array of shareholder addresses to be excluded from dividends
   */
  public modifyDefaultExclusionList = async (args: { shareholderAddresses: string[] }) => {
    const { shareholderAddresses, ...rest } = args;
    const { symbol } = this.securityToken;
    const procedure = new ModifyDividendsDefaultExclusionList(
      {
        symbol,
        shareholderAddresses,
        ...rest,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Retrieve a list of investor addresses and their corresponding tax withholding percentages
   */
  public getTaxWithholdingList = async () => {
    const {
      contractWrappers: { tokenFactory, getAttachedModules },
      factories,
    } = this.context;
    const { symbol, uid: securityTokenId } = this.securityToken;

    let securityToken;

    try {
      securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [dividendsModule] = await getAttachedModules(
      { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: "The Dividends Feature hasn't been enabled",
      });
    }

    const checkpointIndex = await securityToken.currentCheckpointId();

    const checkpointData = await dividendsModule.getCheckpointData({
      checkpointId: checkpointIndex.toNumber(),
    });

    return checkpointData.map(({ investor, withheld }) =>
      factories.taxWithholdingFactory.create(
        TaxWithholding.generateId({
          shareholderAddress: investor,
          securityTokenId,
        }),
        {
          percentage: withheld.toNumber(),
          securityTokenSymbol: symbol,
        }
      )
    );
  };

  /**
   * Retrieve all dividend distributions at a certain checkpoint
   */
  public getDistributions = async (args: { checkpointId: string }) => {
    const { contractWrappers, factories } = this.context;
    const { checkpointId } = args;

    const { symbol, uid: securityTokenId } = this.securityToken;

    const { index: checkpointIndex } = Checkpoint.unserialize(checkpointId);

    const checkpointDividends = await contractWrappers.getAllDividends({
      securityTokenSymbol: symbol,
      checkpointId: checkpointIndex,
    });

    const dividends = checkpointDividends.map(({ index, ...dividend }) =>
      factories.dividendDistributionFactory.create(
        DividendDistribution.generateId({ securityTokenId, index }),
        {
          ...dividend,
          checkpointId,
          securityTokenSymbol: symbol,
        }
      )
    );

    return dividends;
  };

  /**
   * Retrieve a particular dividend distribution by type and index or UUID
   *
   * @param args - dividend uuid or object containing its index
   */
  public getDistribution = async (args: GetDistributionParams | string) => {
    let dividendIndex: number;
    let uid: string;

    // fetch by UUID
    if (typeof args === 'string') {
      uid = args;
    } else {
      ({ dividendIndex } = args);
      const {
        securityToken: { uid: securityTokenId },
      } = this;
      uid = DividendDistribution.generateId({
        securityTokenId,
        index: dividendIndex,
      });
    }

    return this.context.factories.dividendDistributionFactory.fetch(uid);
  };

  /**
   * Retrieve the list of addresses which are excluded from receiving dividend payments by default
   */
  public getDefaultExclusionList = async () => {
    const {
      contractWrappers: { tokenFactory, getAttachedModules },
    } = this.context;

    const { symbol } = this.securityToken;

    try {
      await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [dividendsModule] = await getAttachedModules(
      { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: "The Dividends Feature hasn't been enabled",
      });
    }

    return dividendsModule.getDefaultExcluded();
  };
}
