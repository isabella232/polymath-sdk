import stringify from 'json-stable-stringify';
import {
  ContractEvents,
  SecurityTokenCheckpointCreatedEventArgs,
  SecurityTokenEvents,
  ERC20DividendCheckpointEvents,
  ERC20DividendCheckpointERC20DividendDepositedEventArgs,
  EtherDividendCheckpointEvents,
  EtherDividendCheckpointEtherDividendDepositedEventArgs,
  LogEntry,
  LogWithDecodedArgs,
  DecodedLogArgs,
  SecurityTokenRegistryEvents,
  SecurityTokenRegistryRegisterTickerEventArgs,
  SecurityTokenRegistryNewSecurityTokenEventArgs,
  SecurityTokenModuleAddedEventArgs,
  GeneralTransferManagerEvents,
  GeneralTransferManagerModifyKYCDataEventArgs,
  GeneralTransferManagerModifyInvestorFlagEventArgs,
  SecurityTokenControllerTransferEventArgs,
  CappedSTOEvents,
  USDTieredSTOEvents,
  CappedSTOPauseEventArgs,
  USDTieredSTOPauseEventArgs,
  ERC20DividendCheckpointERC20DividendClaimedEventArgs,
  EtherDividendCheckpointEtherDividendClaimedEventArgs,
  ERC20DividendCheckpointERC20DividendReclaimedEventArgs,
  EtherDividendCheckpointEtherDividendReclaimedEventArgs,
  ERC20DividendCheckpointSetWalletEventArgs,
  EtherDividendCheckpointSetWalletEventArgs,
  ERC20DividendCheckpointSetWithholdingEventArgs,
  EtherDividendCheckpointSetWithholdingEventArgs,
} from '@polymathnetwork/contract-wrappers';
import { isAddress } from 'ethereum-address';

import { Pojo } from '../types';

export const delay = async (amount: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, amount);
  });
};

export function serialize(entityType: string, pojo: Pojo) {
  return Buffer.from(`${entityType}:${stringify(pojo)}`).toString('base64');
}

export function unserialize(id: string) {
  const unserialized = Buffer.from(id, 'base64').toString('utf8');

  const matched = unserialized.match(/^.*?:(.*)/);

  const errorMsg = 'Wrong ID format.';

  if (!matched) {
    throw new Error(errorMsg);
  }

  const [, jsonString] = matched;

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error(errorMsg);
  }
}

export function isValidAddress(address: string) {
  return isAddress(address);
}

interface FindEventParams {
  logs: (LogEntry | LogWithDecodedArgs<DecodedLogArgs>)[];
  eventName: ContractEvents;
}

interface FindTickerRegisteredParams extends FindEventParams {
  eventName: SecurityTokenRegistryEvents.RegisterTicker;
}

interface FindNewSecurityTokenParams extends FindEventParams {
  eventName: SecurityTokenRegistryEvents.NewSecurityToken;
}

interface FindCheckpointCreatedParams extends FindEventParams {
  eventName: SecurityTokenEvents.CheckpointCreated;
}

interface FindErc20DividendDepositedParams extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents.ERC20DividendDeposited;
}

interface FindEtherDividendDepositedParams extends FindEventParams {
  eventName: EtherDividendCheckpointEvents.EtherDividendDeposited;
}

interface FindModuleAddedParams extends FindEventParams {
  eventName: SecurityTokenEvents.ModuleAdded;
}

interface FindControllerTransferParams extends FindEventParams {
  eventName: SecurityTokenEvents.ControllerTransfer;
}

interface FindModifyKycDataParams extends FindEventParams {
  eventName: GeneralTransferManagerEvents.ModifyKYCData;
}

interface FindModifyInvestorFlagParams extends FindEventParams {
  eventName: GeneralTransferManagerEvents.ModifyInvestorFlag;
}

interface FindCappedStoPauseParams extends FindEventParams {
  eventName: CappedSTOEvents.Pause;
}

interface FindUsdTieredStoPauseParams extends FindEventParams {
  eventName: USDTieredSTOEvents.Pause;
}

interface FindErc20DividendClaimedParams extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents.ERC20DividendClaimed;
}

interface FindEthDividendClaimedParams extends FindEventParams {
  eventName: EtherDividendCheckpointEvents.EtherDividendClaimed;
}

interface FindErc20DividendReclaimedParams extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents.ERC20DividendReclaimed;
}

interface FindEthDividendReclaimedParams extends FindEventParams {
  eventName: EtherDividendCheckpointEvents.EtherDividendReclaimed;
}

interface FindErc20SetWallet extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents.SetWallet;
}

interface FindEthSetWallet extends FindEventParams {
  eventName: EtherDividendCheckpointEvents.SetWallet;
}

interface FindErc20SetWithholding extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents.SetWithholding;
}

interface FindEthSetWithholding extends FindEventParams {
  eventName: EtherDividendCheckpointEvents.SetWithholding;
}

interface FindEvents {
  (params: FindTickerRegisteredParams): LogWithDecodedArgs<
    SecurityTokenRegistryRegisterTickerEventArgs
  >[];
  (params: FindNewSecurityTokenParams): LogWithDecodedArgs<
    SecurityTokenRegistryNewSecurityTokenEventArgs
  >[];
  (params: FindModuleAddedParams): LogWithDecodedArgs<SecurityTokenModuleAddedEventArgs>[];
  (params: FindCheckpointCreatedParams): LogWithDecodedArgs<
    SecurityTokenCheckpointCreatedEventArgs
  >[];
  (params: FindControllerTransferParams): LogWithDecodedArgs<
    SecurityTokenControllerTransferEventArgs
  >[];
  (params: FindErc20DividendDepositedParams): LogWithDecodedArgs<
    ERC20DividendCheckpointERC20DividendDepositedEventArgs
  >[];
  (params: FindEtherDividendDepositedParams): LogWithDecodedArgs<
    EtherDividendCheckpointEtherDividendDepositedEventArgs
  >[];
  (params: FindModifyKycDataParams): LogWithDecodedArgs<
    GeneralTransferManagerModifyKYCDataEventArgs
  >[];
  (params: FindModifyInvestorFlagParams): LogWithDecodedArgs<
    GeneralTransferManagerModifyInvestorFlagEventArgs
  >[];
  (params: FindCappedStoPauseParams): LogWithDecodedArgs<CappedSTOPauseEventArgs>[];
  (params: FindUsdTieredStoPauseParams): LogWithDecodedArgs<USDTieredSTOPauseEventArgs>[];
  (params: FindErc20DividendClaimedParams): LogWithDecodedArgs<
    ERC20DividendCheckpointERC20DividendClaimedEventArgs
  >[];
  (params: FindEthDividendClaimedParams): LogWithDecodedArgs<
    EtherDividendCheckpointEtherDividendClaimedEventArgs
  >[];
  (params: FindErc20DividendReclaimedParams): LogWithDecodedArgs<
    ERC20DividendCheckpointERC20DividendReclaimedEventArgs
  >[];
  (params: FindEthDividendReclaimedParams): LogWithDecodedArgs<
    EtherDividendCheckpointEtherDividendReclaimedEventArgs
  >[];
  (params: FindErc20SetWallet): LogWithDecodedArgs<ERC20DividendCheckpointSetWalletEventArgs>[];
  (params: FindEthSetWallet): LogWithDecodedArgs<EtherDividendCheckpointSetWalletEventArgs>[];
  (params: FindErc20SetWithholding): LogWithDecodedArgs<
    ERC20DividendCheckpointSetWithholdingEventArgs
  >[];
  (params: FindEthSetWithholding): LogWithDecodedArgs<
    EtherDividendCheckpointSetWithholdingEventArgs
  >[];
}

export const findEvents: FindEvents = ({
  logs,
  eventName,
}: {
  logs: (LogEntry | LogWithDecodedArgs<DecodedLogArgs>)[];
  eventName: ContractEvents;
}): any => {
  const foundLogs = logs.filter(log => {
    const l = log as LogWithDecodedArgs<DecodedLogArgs>;

    return l.event === eventName;
  });

  return foundLogs;
};
