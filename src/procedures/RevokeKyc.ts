import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { difference } from 'lodash';
import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, ErrorCode, RevokeKycProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';
import { Shareholder, SecurityToken } from '../entities';

export class RevokeKyc extends Procedure<RevokeKycProcedureArgs, Shareholder[]> {
  public type = ProcedureType.CreateErc20DividendDistribution;

  public async prepareTransactions() {
    const { symbol, shareholderAddresses } = this.args;
    const { contractWrappers, factories } = this.context;

    if (shareholderAddresses.length === 0) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'You must provide at least one shareholder address to revoke KYC for',
      });
    }

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const securityToken = await factories.securityTokenFactory.fetch(
      SecurityToken.generateId({ symbol })
    );

    const shareholders = await securityToken.shareholders.getShareholders();

    const currentNonRevokedShareholderAddresses = shareholders
      .filter(shareholder => !shareholder.isRevoked())
      .map(({ address }) => address);
    const diff = difference(shareholderAddresses, currentNonRevokedShareholderAddresses);

    if (diff.length) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `"${diff.join(', ')}" already revoked`,
      });
    }

    const gtmModule = (await contractWrappers.getAttachedModules(
      {
        moduleName: ModuleName.GeneralTransferManager,
        symbol,
      },
      { unarchived: true }
    ))[0];

    if (!gtmModule) {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `General Transfer Manager for token "${symbol}" isn't enabled. Please report this issue to the Polymath team`,
      });
    }

    const canSendAfter: Date[] = [];
    const canReceiveAfter: Date[] = [];
    const expiryTime: Date[] = [];

    shareholderAddresses.forEach(_address => {
      canSendAfter.push(new Date(0));
      canReceiveAfter.push(new Date(0));
      expiryTime.push(new Date(0));
    });

    const securityTokenId = SecurityToken.generateId({ symbol });

    let revokedShareholders;

    [revokedShareholders] = await this.addTransaction<
      TransactionParams.GeneralTransferManager.ModifyKYCDataMulti,
      [Shareholder[]]
    >(gtmModule.modifyKYCDataMulti, {
      tag: PolyTransactionTag.ModifyKycDataMulti,
      resolvers: [
        async () => {
          const refreshingShareholders = shareholderAddresses.map(shareholder => {
            return factories.shareholderFactory.refresh(
              Shareholder.generateId({
                securityTokenId,
                address: shareholder,
              })
            );
          });

          await Promise.all(refreshingShareholders);

          const fetchingShareholders = shareholderAddresses.map(shareholder => {
            return factories.shareholderFactory.fetch(
              Shareholder.generateId({
                securityTokenId,
                address: shareholder,
              })
            );
          });

          return Promise.all(fetchingShareholders);
        },
      ],
    })({
      investors: shareholderAddresses,
      canSendAfter,
      canReceiveAfter,
      expiryTime,
    });

    return revokedShareholders;
  }
}
