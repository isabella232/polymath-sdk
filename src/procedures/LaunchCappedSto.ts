import {
  ModuleName,
  BigNumber,
  CappedSTOFundRaiseType,
  SecurityTokenEvents,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  LaunchCappedStoProcedureArgs,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { TransferErc20 } from './TransferErc20';
import { SecurityToken, CappedSto } from '../entities';
import { findEvents } from '../utils';

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
    treasuryWallet: string;
  };
  archived: boolean;
  label?: string;
}

export class LaunchCappedSto extends Procedure<LaunchCappedStoProcedureArgs, CappedSto> {
  public type = ProcedureType.LaunchCappedSto;

  public async prepareTransactions() {
    const { args, context } = this;
    const {
      symbol,
      startDate,
      endDate,
      tokensOnSale,
      rate,
      currency,
      storageWallet,
      treasuryWallet,
    } = args;
    const {
      contractWrappers,
      factories: { cappedStoFactory },
    } = context;

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

    const securityTokenAddress = await securityToken.address();
    const moduleName = ModuleName.CappedSTO;

    const factoryAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress: securityTokenAddress,
      moduleName,
    });

    const moduleFactory = await contractWrappers.moduleFactory.getModuleFactory(factoryAddress);
    let usdCost: BigNumber | null = null;
    const [polyCost, isCostInPoly, cost] = await Promise.all([
      moduleFactory.setupCostInPoly(),
      moduleFactory.isCostInPoly(),
      moduleFactory.setupCost(),
    ]);

    if (!isCostInPoly) {
      usdCost = cost;
    }

    await this.addProcedure(TransferErc20)({
      receiver: securityTokenAddress,
      amount: polyCost,
    });

    const newSto = await this.addTransaction<AddCappedSTOParams, CappedSto>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnableCappedSto,
        fees: {
          usd: usdCost,
          poly: polyCost,
        },
        resolver: async receipt => {
          const { logs } = receipt;

          const [event] = findEvents({
            eventName: SecurityTokenEvents.ModuleAdded,
            logs,
          });

          if (event) {
            const { args: eventArgs } = event;

            const { _module } = eventArgs;

            return cappedStoFactory.fetch(
              CappedSto.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                stoType: StoType.Capped,
                address: _module,
              })
            );
          }
          throw new PolymathError({
            code: ErrorCode.UnexpectedEventLogs,
            message:
              "The Capped STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
          });
        },
      }
    )({
      moduleName,
      address: factoryAddress,
      data: {
        startTime: startDate,
        endTime: endDate,
        cap: tokensOnSale,
        rate,
        fundRaiseType: currency,
        fundsReceiver: storageWallet,
        treasuryWallet,
      },
      archived: false,
    });

    return newSto;
  }
}
