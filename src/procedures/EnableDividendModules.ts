import { ModuleName, ModuleType } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  EnableDividendModulesProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendModuleType,
} from '../types';
import { PolymathError } from '../PolymathError';

interface AddDividendCheckpointParams {
  moduleName: ModuleName.ERC20DividendCheckpoint | ModuleName.EtherDividendCheckpoint;
  address: string;
  data: {
    wallet: string;
  };
}

export class EnableDividendModules extends Procedure<EnableDividendModulesProcedureArgs> {
  public type = ProcedureType.EnableDividendModules;

  public async prepareTransactions() {
    const {
      symbol,
      storageWalletAddress,
      types = [DividendModuleType.Erc20, DividendModuleType.Eth],
    } = this.args;
    const { contractWrappers } = this.context;

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

    const tokenAddress = await securityToken.address();

    const moduleNames: {
      [DividendModuleType.Erc20]: ModuleName.ERC20DividendCheckpoint;
      [DividendModuleType.Eth]: ModuleName.EtherDividendCheckpoint;
    } = {
      [DividendModuleType.Erc20]: ModuleName.ERC20DividendCheckpoint,
      [DividendModuleType.Eth]: ModuleName.EtherDividendCheckpoint,
    };

    for (const type of types) {
      const moduleName = moduleNames[type];
      const moduleAddress = await contractWrappers.getModuleFactoryAddress({
        tokenAddress,
        moduleName,
      });

      await this.addTransaction<AddDividendCheckpointParams>(securityToken.addModule, {
        tag: PolyTransactionTag.EnableDividends,
      })({
        moduleName,
        address: moduleAddress,
        data: { wallet: storageWalletAddress },
      });
    }
  }
}
