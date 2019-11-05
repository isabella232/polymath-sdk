import { SecurityToken } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { DisableFeatureArgs, ProcedureType, PolyTransactionTag, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

interface DisableFeatureParams {
  moduleAddress: string;
}

export class DisableFeature extends Procedure<DisableFeatureArgs> {
  public type = ProcedureType.EnableDividendManagers;

  public async prepareTransactions() {
    const { symbol, moduleName } = this.args;
    const { contractWrappers } = this.context;

    let securityToken: SecurityToken;

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

    const moduleAddress = (await contractWrappers.getModuleAddressesByName(
      {
        symbol,
        moduleName,
      },
      { unarchived: true }
    ))[0];

    await this.addTransaction<DisableFeatureParams>(securityToken.archiveModule, {
      tag: PolyTransactionTag.DisableFeature,
    })({
      moduleAddress,
    });
  }
}
