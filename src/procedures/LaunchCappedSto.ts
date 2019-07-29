import { ModuleName, BigNumber, CappedSTOFundRaiseType } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  LaunchCappedStoProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';

interface AddCappedSTOParams {
  moduleName: ModuleName.CappedSTO;
  address: string;
  data: {
    startTime: Date;
    endTime: Date;
    cap: BigNumber;
    rate: BigNumber;
    fundRaiseType: CappedSTOFundRaiseType;
    fundsReceiver: string;
  };
  archived: boolean;
  label?: string;
}

export class LaunchCappedSto extends Procedure<LaunchCappedStoProcedureArgs> {
  public type = ProcedureType.LaunchCappedSto;

  public async prepareTransactions() {
    const { symbol, ...data } = this.args;
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
    const moduleName = ModuleName.CappedSTO;

    const factoryAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    const moduleFactory = await contractWrappers.moduleFactory.getModuleFactory(factoryAddress);
    const cost = await moduleFactory.setupCostInPoly();

    await this.addTransaction(contractWrappers.polyToken.transfer, {
      tag: PolyTransactionTag.Transfer,
    })({
      to: tokenAddress,
      value: cost,
    });

    await this.addTransaction<AddCappedSTOParams>(securityToken.addModuleWithLabel, {
      tag: PolyTransactionTag.EnableCappedSto,
    })({
      moduleName,
      address: factoryAddress,
      data,
      archived: false,
    });
  }
}
