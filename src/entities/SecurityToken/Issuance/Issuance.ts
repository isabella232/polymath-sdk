import { SubModule } from '../SubModule';
import { FreezeIssuance, IssueTokens } from '../../../procedures';
import { ErrorCode, IssuanceDataEntry } from '../../../types';
import { Offerings } from './Offerings';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';
import { PolymathError } from '../../../PolymathError';

export class Issuance extends SubModule {
  public offerings: Offerings;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.offerings = new Offerings(securityToken, context);
  }

  /**
   * Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise,
   * the corresponding shareholder data for that address must be supplied to this method
   * NOTE: If shareholder data is supplied, client-side validations to verify if the transfer is possible won't be performed
   *
   * @param issuanceData array of issuance data
   * @param issuanceData[].address address of the shareholder to issue tokens for
   * @param issuanceData[].amount amount of tokens to issue
   * @param issuanceData[].shareholderData KYC-related and other shareholder data to add/modify (optional. If not supplied, the shareholder is implied to exist already)
   * @param issuanceData[].shareholderData.canSendAfter date after which the shareholder can transfer tokens
   * @param issuanceData[].shareholderData.canReceiveAfter date after which the shareholder can receive tokens
   * @param issuanceData[].shareholderData.kycExpiry date at which the shareholder's KYC expires
   * @param issuanceData[].shareholderData.isAccredited whether the shareholder is accredited (defaults to false)
   * @param issuanceData[].shareholderData.canBuyFromSto whether the shareholder is allowed to purchase tokens in an STO (defaults to true)
   */
  public issue = async (args: { issuanceData: IssuanceDataEntry[] }) => {
    const procedure = new IssueTokens(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Permanently freeze issuance of the security token
   * @param signature optional signed data. If not passed, signing will be requested on the spot
   */
  public freeze = async (args?: { signature?: string }) => {
    const { symbol } = this.securityToken;
    const procedure = new FreezeIssuance({ ...args, symbol }, this.context);
    return procedure.prepare();
  };

  /**
   * Retrieve whether the issuance of tokens is allowed or not
   * Can be permanently frozen with `freeze`
   */
  public allowed = async (): Promise<Boolean> => {
    const {
      context: { contractWrappers },
      securityToken: { symbol },
    } = this;

    let securityTokenInstance;

    try {
      securityTokenInstance = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    return securityTokenInstance.isIssuable();
  };
}
