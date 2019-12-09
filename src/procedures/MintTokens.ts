import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { difference } from 'lodash';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  MintTokensProcedureArgs,
  ShareholderDataEntry,
} from '../types';
import { PolymathError } from '../PolymathError';
import { Shareholder, SecurityToken } from '../entities';
import { ModifyShareholderData } from './ModifyShareholderData';
import { Factories } from '../Context';

export const refreshSecurityTokenFactoryResolver = (
  factories: Factories,
  securityTokenId: string
) => async () => {
  return factories.securityTokenFactory.refresh(securityTokenId);
};

export class MintTokens extends Procedure<MintTokensProcedureArgs, Shareholder[] | void> {
  public type = ProcedureType.MintTokens;

  public async prepareTransactions() {
    const { symbol, mintingData } = this.args;
    const { contractWrappers, factories } = this.context;

    let securityToken;

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
    const updatedShareholderAddresses: string[] = [];

    mintingData.forEach(({ address, amount, shareholderData }) => {
      investors.push(address);
      values.push(amount);

      if (shareholderData) {
        updatedShareholderAddresses.push(address);
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
    }

    const securityTokenEntity = await factories.securityTokenFactory.fetch(
      SecurityToken.generateId({ symbol })
    );

    const shareholders = await securityTokenEntity.shareholders.getShareholders();

    // complete gaps in latest kyc data with current shareholders
    shareholders.forEach(
      ({ address, canSendAfter, canReceiveAfter, kycExpiry, canBuyFromSto, isAccredited }) => {
        if (
          !updatedShareholderData.find(
            data => data.address.toUpperCase() === address.toUpperCase()
          ) &&
          !!investors.find(investor => investor.toUpperCase() === address.toUpperCase())
        ) {
          updatedShareholderData.push({
            address,
            canSendAfter,
            canReceiveAfter,
            kycExpiry,
            canBuyFromSto,
            isAccredited,
          });
        }
      }
    );

    const missingShareholders = difference(investors, updatedShareholderAddresses).filter(
      investor =>
        !shareholders.find(({ address }) => address.toUpperCase() === investor.toUpperCase())
    );

    if (missingShareholders.length) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Cannot mint tokens to the following addresses: [${missingShareholders.join(
          ', '
        )}]. Reason: Those addresses are not Shareholders`,
      });
    }

    const now = new Date();

    const expiredKyc = updatedShareholderData.filter(
      ({ canReceiveAfter, kycExpiry }) => canReceiveAfter > now || now > kycExpiry
    );

    if (expiredKyc.length > 0) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Cannot mint tokens to the following addresses: [${expiredKyc
          .map(({ address }) => address)
          .join(', ')}]. Reason: Expired KYC`,
      });
    }
    const { uid: securityTokenId } = securityTokenEntity;

    const [newShareholders] = await this.addTransaction(securityToken.issueMulti, {
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
        refreshSecurityTokenFactoryResolver(factories, securityTokenId),
      ],
    })({ investors, values });

    return newShareholders;
  }
}
