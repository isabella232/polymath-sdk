import {
  ModuleName,
  BigNumber,
  CappedSTOFundRaiseType,
  SecurityTokenEvents,
  isCappedSTO_3_0_0,
  TransactionParams,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  LaunchCappedStoProcedureArgs,
  StoType,
  Currency,
} from '../types';
import { PolymathError } from '../PolymathError';
import { TransferErc20 } from './TransferErc20';
import { SecurityToken, CappedSto } from '../entities';
import { findEvents } from '../utils';

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
      raisedFundsWallet,
      unsoldTokensWallet,
      allowPreMinting = false,
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

    const fundRaiseType =
      currency === Currency.ETH ? CappedSTOFundRaiseType.ETH : CappedSTOFundRaiseType.POLY;

    const [newStoAddress, newSto] = await this.addTransaction<
      TransactionParams.SecurityToken.AddCappedSTO,
      [string, CappedSto]
    >(securityToken.addModuleWithLabel, {
      tag: PolyTransactionTag.EnableCappedSto,
      fees: {
        usd: usdCost,
        poly: polyCost,
      },
      resolvers: [
        async receipt => {
          const { logs } = receipt;

          const [event] = findEvents({
            eventName: SecurityTokenEvents.ModuleAdded,
            logs,
          });

          if (event) {
            const { args: eventArgs } = event;

            const { _module } = eventArgs;

            return _module;
          }
          throw new PolymathError({
            code: ErrorCode.UnexpectedEventLogs,
            message:
              "The Capped STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
          });
        },
        async receipt => {
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
      ],
    })({
      moduleName,
      address: factoryAddress,
      data: {
        startTime: startDate,
        endTime: endDate,
        cap: tokensOnSale,
        rate,
        fundRaiseType,
        fundsReceiver: raisedFundsWallet,
        treasuryWallet: unsoldTokensWallet,
      },
      maxCost: polyCost,
      archived: false,
    });

    if (allowPreMinting) {
      await this.addTransaction(
        {
          futureValue: newStoAddress,
          futureMethod: async address => {
            const stoModule = await contractWrappers.moduleFactory.getModuleInstance({
              name: ModuleName.CappedSTO,
              address,
            });

            if (isCappedSTO_3_0_0(stoModule)) {
              throw new PolymathError({
                code: ErrorCode.IncorrectVersion,
                message:
                  'STO version is 3.0.0. Version 3.1.0 or greater is required for pre-minting',
              });
            }

            return stoModule.allowPreMinting;
          },
        },
        {
          tag: PolyTransactionTag.AllowPreMinting,
          resolvers: [
            () => {
              return cappedStoFactory.update(
                CappedSto.generateId({
                  securityTokenId: SecurityToken.generateId({ symbol }),
                  stoType: StoType.Capped,
                  address: newStoAddress.result!,
                }),
                { preMintAllowed: true }
              );
            },
          ],
        }
      )({});
    }

    return newSto;
  }
}
