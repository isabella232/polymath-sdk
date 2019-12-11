import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { SubModule } from '../SubModule';
import { IssueTokens } from '../../../procedures';
import { IssuanceDataEntry } from '../../../types';
import { Offerings } from './Offerings';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';

export class Issuance extends SubModule {
  public offerings: Offerings;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.offerings = new Offerings(securityToken, context);
  }

  /**
   * Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise,
   * the corresponding shareholder data for that address must be supplied to this method
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
}
