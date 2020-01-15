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
  LaunchSimpleStoProcedureArgs,
  StoType,
  Currency,
} from '../types';
import { PolymathError } from '../PolymathError';
import { TransferErc20 } from './TransferErc20';
import { SecurityToken, SimpleSto } from '../entities';
import { findEvents } from '../utils';

/**
 * Procedure that launches a Simple STO
 */
export class LaunchSimpleSto extends Procedure<LaunchSimpleStoProcedureArgs, SimpleSto> {
  public type = ProcedureType.LaunchSimpleSto;

  /**
   * - Transfer the necessary amount of POLY to the Security Token to cover the STO's setup fee
   *
   * - Launch the Simple STO
   *
   * - Allow pre-issuing (if applicable)
   *
   * - Return the newly created STO

   * Notes:
   * - Pre-issuing defaults to false
   * - Pre-issuing can only be enabled on a version 3.1 (or greater) Simple STO. Attempting to do so in versions 3.0 or lower will cause the procedure to fail
   */
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
      allowPreIssuing = false,
    } = args;
    const {
      contractWrappers,
      factories: { simpleStoFactory },
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

    const balance = await contractWrappers.polyToken.balanceOf({ owner: securityTokenAddress });
    const difference = polyCost.minus(balance);

    // only transfer the required amount of POLY
    if (difference.gt(new BigNumber(0))) {
      await this.addProcedure(TransferErc20)({
        receiver: securityTokenAddress,
        amount: difference,
      });
    }

    const fundRaiseType =
      currency === Currency.ETH ? CappedSTOFundRaiseType.ETH : CappedSTOFundRaiseType.POLY;

    const [newStoAddress, newSto] = await this.addTransaction<
      TransactionParams.SecurityToken.AddCappedSTO,
      [string, SimpleSto]
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

            return simpleStoFactory.fetch(
              SimpleSto.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                stoType: StoType.Simple,
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

    if (allowPreIssuing) {
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
                  'STO version is 3.0.0. Version 3.1.0 or greater is required for pre-issuing',
              });
            }

            return stoModule.allowPreMinting;
          },
        },
        {
          tag: PolyTransactionTag.AllowPreMinting,
          resolvers: [
            () => {
              return simpleStoFactory.update(
                SimpleSto.generateId({
                  securityTokenId: SecurityToken.generateId({ symbol }),
                  stoType: StoType.Simple,
                  address: newStoAddress.result!,
                }),
                { preIssueAllowed: true }
              );
            },
          ],
        }
      )({});
    }

    return newSto;
  }
}
