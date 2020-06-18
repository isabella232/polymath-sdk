import {
  BigNumber,
  TransactionParams,
  TransferStatusCode as RawTransferStatusCode,
  SecurityToken_3_0_0,
} from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  IssueTokensProcedureArgs,
  TokenholderDataEntry,
} from '../types';
import { PolymathError } from '../PolymathError';
import { Tokenholder, SecurityToken } from '../entities';
import { ModifyTokenholderData } from './ModifyTokenholderData';
import { Factories } from '../Context';
import { ZERO_ADDRESS } from '../utils/constants';

/**
 * @hidden
 */
export const createRefreshSecurityTokenFactoryResolver = (
  factories: Factories,
  securityTokenId: string
) => async () => {
  return factories.securityTokenFactory.refresh(securityTokenId);
};

/**
 * Procedure that issues tokens to the specified addresses. KYC data for those addresses must already exist or otherwise be provided in this procedure
 */
export class IssueTokens extends Procedure<IssueTokensProcedureArgs, Tokenholder[]> {
  public type = ProcedureType.IssueTokens;

  /**
   * Issue the specified amounts to the corresponding addresses
   * If KYC data is provided, transfer restrictions will not be checked before submitting the issuing transaction
   * This means that if one of the wallets on the list doesn't clear transfer restrictions, the transaction will revert
   *
   * Note that this procedure will fail if:
   * - The Security Token doesn't exist
   * - At least one wallet address doesn't clear transfer restrictions. This check is bypassed if new KYC data is provided
   */
  public async prepareTransactions() {
    const { symbol, issuanceData } = this.args;
    const { contractWrappers, factories } = this.context;

    let securityToken: SecurityToken_3_0_0;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const investors: string[] = [];
    const values: BigNumber[] = [];
    const updatedTokenholderData: TokenholderDataEntry[] = [];

    issuanceData.forEach(({ address, amount, tokenholderData }) => {
      investors.push(address);
      values.push(amount);

      if (tokenholderData) {
        updatedTokenholderData.push({
          address,
          ...tokenholderData,
        });
      }
    });

    if (updatedTokenholderData.length > 0) {
      await this.addProcedure(ModifyTokenholderData)({
        symbol,
        tokenholderData: updatedTokenholderData,
      });
    } else {
      const invalidAddresses: string[] = [];
      const invalidCodes: RawTransferStatusCode[] = [];
      await P.map(investors, async (to, i) => {
        const { statusCode } = await securityToken.canTransferFrom({
          from: ZERO_ADDRESS,
          to,
          value: values[i],
        });

        if (statusCode !== RawTransferStatusCode.TransferSuccess) {
          invalidAddresses.push(to);
          invalidCodes.push(statusCode);
        }
      });

      if (invalidAddresses.length) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot issue tokens to the following addresses: [${invalidAddresses.join(
            ', '
          )}]. Reasons: [${invalidCodes.join(', ')}]`,
        });
      }
    }

    const securityTokenEntity = await factories.securityTokenFactory.fetch(
      SecurityToken.generateId({ symbol })
    );

    const { uid: securityTokenId } = securityTokenEntity;

    const [newTokenholders] = await this.addTransaction<
      TransactionParams.SecurityToken.IssueMulti,
      [Tokenholder[], void]
    >(securityToken.issueMulti, {
      tag: PolyTransactionTag.IssueMulti,
      resolvers: [
        async () => {
          const fetchingTokenholders = investors.map(address => {
            return factories.tokenholderFactory.fetch(
              Tokenholder.generateId({
                securityTokenId,
                address,
              })
            );
          });
          return Promise.all(fetchingTokenholders);
        },
        createRefreshSecurityTokenFactoryResolver(factories, securityTokenId),
      ],
    })({ investors, values });

    return newTokenholders;
  }
}
