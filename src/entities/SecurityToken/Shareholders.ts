import { ModuleName, SecurityToken } from '@polymathnetwork/contract-wrappers';
import { ShareholderDataEntry, DividendType, ErrorCode } from '../../types';
import { ModifyShareholderData, CreateCheckpoint } from '../../procedures';
import { SubModule } from './SubModule';
import { Checkpoint } from '../Checkpoint';
import { PolymathError } from '../../PolymathError';
import { BaseCheckpoint, BaseDividend } from '../../PolymathBase';
import { DividendDistribution } from '../DividendDistribution';
import { Shareholder } from '../Shareholder';

export class Shareholders extends SubModule {
  /**
   * Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address (and other KYC data)
   * must be added/modified via this method
   *
   * @param shareholderData array of shareholder data to add/modify
   * @param shareholderData[].address address of the shareholder whose data will be added/modified
   * @param shareholderData[].canSendAfter date after which the shareholder can transfer tokens
   * @param shareholderData[].canReceiveAfter date after which the shareholder can receive tokens
   * @param shareholderData[].kycExpiry date at which the shareholder's KYC expires
   * @param shareholderData[].isAccredited whether the shareholder is accredited (defaults to false)
   * @param shareholderData[].canBuyFromSto whether the shareholder is allowed to purchase tokens in an STO (defaults to true)
   */
  public modifyData = async (args: { shareholderData: ShareholderDataEntry[] }) => {
    const procedure = new ModifyShareholderData(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Create a snapshot of the balances of every shareholder at the current date
   */
  public createCheckpoint = async () => {
    const { context, securityToken } = this;
    const { symbol } = securityToken;
    const procedure = new CreateCheckpoint(
      {
        symbol,
      },
      context,
      securityToken
    );
    return procedure.prepare();
  };

  /**
   * Retrieve list of checkpoints and their corresponding dividend distributions of every type
   */
  public getCheckpoints = async (): Promise<Checkpoint[]> => {
    const { contractWrappers } = this.context;

    const { symbol, uid } = this.securityToken;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const allDividends = await contractWrappers.getAllDividends({
      securityTokenSymbol: symbol,
    });

    const checkpoints: BaseCheckpoint[] = await contractWrappers.getCheckpoints({ securityToken });

    return checkpoints.map(checkpoint => {
      const checkpointDividends = allDividends.filter(
        dividend => dividend.checkpointId === checkpoint.index
      );

      return this.assembleCheckpoint({
        securityTokenId: uid,
        securityTokenSymbol: symbol,
        checkpoint,
        checkpointDividends,
      });
    });
  };

  /**
   * Retrieve a checkpoint from the security token by index or UUID
   *
   * @param checkpointIndex index of the checkpoint within the Security Token
   */
  public getCheckpoint = async (
    args:
      | {
          checkpointIndex: number;
        }
      | string,
    opts?: { dividendTypes?: DividendType[] }
  ) => {
    const { contractWrappers } = this.context;

    let checkpointIndex: number;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ index: checkpointIndex } = Checkpoint.unserialize(args));
    } else {
      ({ checkpointIndex } = args);
    }

    let dividendTypes: DividendType[] | undefined;

    if (opts) {
      ({ dividendTypes } = opts);
    }

    const { symbol: securityTokenSymbol, uid: securityTokenId } = this.securityToken;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        securityTokenSymbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${securityTokenSymbol}`,
      });
    }

    const checkpointDividends = await contractWrappers.getAllDividends({
      securityTokenSymbol,
      checkpointId: checkpointIndex,
      dividendTypes,
    });

    const checkpoint = await contractWrappers.getCheckpoint({
      checkpointId: checkpointIndex,
      securityToken,
    });

    return this.assembleCheckpoint({
      securityTokenId,
      securityTokenSymbol,
      checkpoint,
      checkpointDividends,
    });
  };

  /**
   * Auxiliary function to create a checkpoint entity
   */
  private assembleCheckpoint = ({
    securityTokenId,
    securityTokenSymbol,
    checkpoint,
    checkpointDividends,
  }: {
    securityTokenId: string;
    securityTokenSymbol: string;
    checkpoint: BaseCheckpoint;
    checkpointDividends: BaseDividend[];
  }) => {
    const checkpointId = Checkpoint.generateId({
      securityTokenId,
      index: checkpoint.index,
    });

    const dividendDistributions = checkpointDividends.map(
      distribution =>
        new DividendDistribution(
          {
            ...distribution,
            checkpointId,
            securityTokenSymbol,
            securityTokenId,
          },
          this.context
        )
    );

    const checkpointEntity = new Checkpoint({
      ...checkpoint,
      securityTokenId,
      securityTokenSymbol,
      dividendDistributions,
    });

    return checkpointEntity;
  };

  /**
   * Get data for all shareholders associated to the Security Token
   */
  public getShareholders = async () => {
    const { contractWrappers } = this.context;

    const { symbol: securityTokenSymbol, uid: securityTokenId } = this.securityToken;

    let securityToken: SecurityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        securityTokenSymbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${securityTokenSymbol}`,
      });
    }

    const generalTransferManager = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralTransferManager, symbol: securityTokenSymbol },
      { unarchived: true }
    ))[0];

    const [allKycData, allFlags] = await Promise.all([
      generalTransferManager.getAllKYCData(),
      generalTransferManager.getAllInvestorFlags(),
    ]);

    const shareholders = [];

    const balances = await Promise.all(
      allKycData.map(({ investor }) => securityToken.balanceOf({ owner: investor }))
    );

    for (let i = 0; i < allKycData.length; ++i) {
      const { investor: address, canSendAfter, canReceiveAfter, expiryTime } = allKycData[i];
      const { isAccredited, canNotBuyFromSTO } = allFlags[i];
      const balance = balances[i];

      const data = new Shareholder({
        balance,
        address,
        canSendAfter,
        canReceiveAfter,
        kycExpiry: expiryTime,
        isAccredited,
        canBuyFromSto: !canNotBuyFromSTO,
        securityTokenId,
        securityTokenSymbol,
      });

      shareholders.push(data);
    }

    return shareholders;
  };
}
