import { ModuleName } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyPercentageWhitelistProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';

export class ModifyPercentageWhitelist extends Procedure<ModifyPercentageWhitelistProcedureArgs> {
  public type = ProcedureType.ModifyPercentageWhitelist;

  public async prepareTransactions() {
    const { symbol, entries } = this.args;
    const { contractWrappers } = this.context;

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

    const entriesToChange = await P.filter(entries, async ({ address, whitelisted }) => {
      const isWhitelisted = await percentageTransferManagerModule.whitelist({
        investorAddress: address,
      });

      return isWhitelisted !== whitelisted;
    });

    if (!entriesToChange.length) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Modify percentage whitelist failed: Nothing to modify',
      });
    }

    entriesToChange.forEach(({ address, whitelisted }) => {
      investors.push(address);
      valids.push(whitelisted);
    });

    await this.addTransaction(percentageTransferManagerModule.modifyWhitelistMulti, {
      tag: PolyTransactionTag.ModifyWhitelistMulti,
    })({ investors, valids });
  }
}
