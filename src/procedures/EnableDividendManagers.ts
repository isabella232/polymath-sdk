import { ModuleName, SecurityToken } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  EnableDividendManagersProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';

interface AddDividendCheckpointParams {
  moduleName: ModuleName.ERC20DividendCheckpoint | ModuleName.EtherDividendCheckpoint;
  address: string;
  data: {
    wallet: string;
  };
  archived: boolean;
  label?: string;
}

export class EnableDividendManagers extends Procedure<EnableDividendManagersProcedureArgs> {
  public type = ProcedureType.EnableDividendManagers;

  public async prepareTransactions() {
    const {
      symbol,
      storageWalletAddress,
      types = [DividendType.Erc20, DividendType.Eth],
    } = this.args;
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

    const tokenAddress = await securityToken.address();

    const moduleNames: {
      [DividendType.Erc20]: ModuleName.ERC20DividendCheckpoint;
      [DividendType.Eth]: ModuleName.EtherDividendCheckpoint;
    } = {
      [DividendType.Erc20]: ModuleName.ERC20DividendCheckpoint,
      [DividendType.Eth]: ModuleName.EtherDividendCheckpoint,
    };

    await P.each(types, async type => {
      const moduleName = moduleNames[type];
      const moduleAddress = await contractWrappers.getModuleFactoryAddress({
        tokenAddress,
        moduleName,
      });

      await this.addTransaction<AddDividendCheckpointParams>(securityToken.addModuleWithLabel, {
        tag: PolyTransactionTag.EnableDividends,
      })({
        moduleName,
        address: moduleAddress,
        data: { wallet: storageWalletAddress },
        archived: false,
      });
    });
  }
}
