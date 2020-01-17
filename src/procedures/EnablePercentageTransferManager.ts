import {
  ModuleName,
  TransactionParams,
  SecurityTokenEvents,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  EnablePercentageTransferManagerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { findEvents } from '../utils';

export class EnablePercentageTransferManager extends Procedure<
  EnablePercentageTransferManagerProcedureArgs
> {
  public type = ProcedureType.EnablePercentageTransferManager;

  public async prepareTransactions() {
    const {
      symbol,
      maxHolderPercentage,
      allowPrimaryIssuance = false,
      whitelistEntries,
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
    const moduleName = ModuleName.PercentageTransferManager;

    const moduleAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    const newPTMAddress = await this.addTransaction<
      TransactionParams.SecurityToken.AddPercentageTransferManager,
      [string]
    >(securityToken.addModuleWithLabel, {
      tag: PolyTransactionTag.EnablePercentageTransferManager,
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
              "The Percentage Transfer Manager was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
          });
        },
      ],
    })({
      moduleName,
      address: moduleAddress,
      archived: false,
      data: {
        maxHolderPercentage,
        allowPrimaryIssuance,
      },
    });

    if (whitelistEntries !== undefined && !whitelistEntries.length) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Whitelist data passed can not be an empty list`,
      });
    }

    /*
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
      */

    const investors: string[] = [];
    const valids: boolean[] = [];

    whitelistEntries!.forEach(({ address, whitelisted }) => {
      investors.push(address);
      valids.push(whitelisted);
    });

    await this.addTransaction(
      {
        futureValue: newPTMAddress,
        futureMethod: async address => {},
      },
      {
        tag: PolyTransactionTag.ModifyWhitelistMulti,
      }
    )({ investors, valids });

    /* await this.addTransaction(percentageTransferManagerModule.modifyWhitelistMulti, {
        tag: PolyTransactionTag.ModifyWhitelistMulti,
      })({ investors, valids }); */
  }
}
