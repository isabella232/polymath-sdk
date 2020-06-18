import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { difference } from 'lodash';
import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, ErrorCode, RevokeKycProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';
import { Tokenholder, SecurityToken } from '../entities';

/**
 * Procedure that revokes KYC for a list of investors
 */
export class RevokeKyc extends Procedure<RevokeKycProcedureArgs, Tokenholder[]> {
  public type = ProcedureType.RevokeKyc;

  /**
   * Sets all KYC dates for a tokenholder to epoch. This effectively makes them unable to send or receive Security Tokens
   *
   * Note that this procedure will fail if:
   * - The tokenholder address array is empty
   * - The Security Token doesn't exist
   * - KYC is already revoked for at least one of the addresses in the list
   * - Tokenholders Feature isn't enabled
   */
  public async prepareTransactions() {
    const { symbol, tokenholderAddresses } = this.args;
    const { contractWrappers, factories } = this.context;

    if (tokenholderAddresses.length === 0) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'You must provide at least one tokenholder address to revoke KYC for',
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

    const tokenholders = await securityToken.tokenholders.getTokenholders();

    const currentNonRevokedTokenholderAddresses = tokenholders
      .filter(tokenholder => !tokenholder.isRevoked())
      .map(({ address }) => address);
    const diff = difference(tokenholderAddresses, currentNonRevokedTokenholderAddresses);

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

    tokenholderAddresses.forEach(() => {
      canSendAfter.push(new Date(0));
      canReceiveAfter.push(new Date(0));
      expiryTime.push(new Date(0));
    });

    const securityTokenId = SecurityToken.generateId({ symbol });

    const [revokedTokenholders] = await this.addTransaction<
      TransactionParams.GeneralTransferManager.ModifyKYCDataMulti,
      [Tokenholder[]]
    >(gtmModule.modifyKYCDataMulti, {
      tag: PolyTransactionTag.ModifyKycDataMulti,
      resolvers: [
        async () => {
          const refreshingTokenholders = tokenholderAddresses.map(tokenholder => {
            return factories.tokenholderFactory.refresh(
              Tokenholder.generateId({
                securityTokenId,
                address: tokenholder,
              })
            );
          });

          await Promise.all(refreshingTokenholders);

          const fetchingTokenholders = tokenholderAddresses.map(tokenholder => {
            return factories.tokenholderFactory.fetch(
              Tokenholder.generateId({
                securityTokenId,
                address: tokenholder,
              })
            );
          });

          return Promise.all(fetchingTokenholders);
        },
      ],
    })({
      investors: tokenholderAddresses,
      canSendAfter,
      canReceiveAfter,
      expiryTime,
    });

    return revokedTokenholders;
  }
}
