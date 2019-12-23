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
  ShareholderDataEntry,
} from '../types';
import { PolymathError } from '../PolymathError';
import { Shareholder, SecurityToken } from '../entities';
import { ModifyShareholderData } from './ModifyShareholderData';
import { Factories } from '../Context';
import { ZERO_ADDRESS } from '../utils/constants';

export const createRefreshSecurityTokenFactoryResolver = (
  factories: Factories,
  securityTokenId: string
) => async () => {
  return factories.securityTokenFactory.refresh(securityTokenId);
};

export class IssueTokens extends Procedure<IssueTokensProcedureArgs, Shareholder[]> {
  public type = ProcedureType.IssueTokens;

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
    const updatedShareholderData: ShareholderDataEntry[] = [];

    issuanceData.forEach(({ address, amount, shareholderData }) => {
      investors.push(address);
      values.push(amount);

      if (shareholderData) {
        updatedShareholderData.push({
          address,
          ...shareholderData,
        });
      }
    });

    if (updatedShareholderData.length > 0) {
      await this.addProcedure(ModifyShareholderData)({
        symbol,
        shareholderData: updatedShareholderData,
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

    const [newShareholders] = await this.addTransaction<
      TransactionParams.SecurityToken.IssueMulti,
      [Shareholder[], void]
    >(securityToken.issueMulti, {
      tag: PolyTransactionTag.IssueMulti,
      resolvers: [
        async () => {
          const fetchingShareholders = investors.map(address => {
            return factories.shareholderFactory.fetch(
              Shareholder.generateId({
                securityTokenId,
                address,
              })
            );
          });
          return Promise.all(fetchingShareholders);
        },
        createRefreshSecurityTokenFactoryResolver(factories, securityTokenId),
      ],
    })({ investors, values });

    return newShareholders;
  }
}
