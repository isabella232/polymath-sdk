import { ModuleName } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyPercentageExemptionsProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';

export class ModifyPercentageExemptions extends Procedure<ModifyPercentageExemptionsProcedureArgs> {
  public type = ProcedureType.ModifyPercentageExemptions;

  public async prepareTransactions() {
    const { symbol, whitelistEntries = [], allowPrimaryIssuance } = this.args;
    const { contractWrappers } = this.context;

    if (!whitelistEntries.length && allowPrimaryIssuance === undefined) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Nothing to modify. Please pass the corresponding parameters',
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

    const percentageTransferManagerModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.PercentageTransferManager, symbol },
      { unarchived: true }
    ))[0];

    if (!percentageTransferManagerModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'You must enable the PercentageOwnershipRestrictions Feature',
      });
    }

    const investors: string[] = [];
    const valids: boolean[] = [];

    const [entriesToChange, isPrimaryIssuanceAllowed] = await Promise.all([
      P.filter(whitelistEntries, async ({ address, whitelisted }) => {
        const isWhitelisted = await percentageTransferManagerModule.whitelist({
          investorAddress: address,
        });

        return isWhitelisted !== whitelisted;
      }),
      percentageTransferManagerModule.allowPrimaryIssuance(),
    ]);

    if (!entriesToChange.length) {
      if (whitelistEntries.length) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Whitelist data passed is the same data currently in the contract',
        });
      }
    } else {
      entriesToChange.forEach(({ address, whitelisted }) => {
        investors.push(address);
        valids.push(whitelisted);
      });

      await this.addTransaction(percentageTransferManagerModule.modifyWhitelistMulti, {
        tag: PolyTransactionTag.ModifyWhitelistMulti,
      })({ investors, valids });
    }

    if (allowPrimaryIssuance !== undefined && allowPrimaryIssuance !== isPrimaryIssuanceAllowed) {
      await this.addTransaction(percentageTransferManagerModule.setAllowPrimaryIssuance, {
        tag: PolyTransactionTag.SetAllowPrimaryIssuance,
      })({ allowPrimaryIssuance });
    }
  }
}
