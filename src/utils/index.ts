import stringify from 'json-stable-stringify';
import {
  ContractEvents,
  LogEntry,
  LogWithDecodedArgs,
  DecodedLogArgs,
  SecurityTokenRegistryEvents,
  SecurityTokenRegistryRegisterTickerEventArgs,
  SecurityTokenRegistryNewSecurityTokenEventArgs,
  SecurityTokenEvents_3_0_0,
  SecurityTokenModuleAddedEventArgs_3_0_0,
  SecurityTokenCheckpointCreatedEventArgs_3_0_0,
  SecurityTokenControllerTransferEventArgs_3_0_0,
  GeneralTransferManagerEvents_3_0_0,
  GeneralTransferManagerModifyKYCDataEventArgs_3_0_0,
  GeneralTransferManagerModifyInvestorFlagEventArgs_3_0_0,
  GeneralTransferManagerEvents_3_1_0,
  GeneralTransferManagerModifyKYCDataEventArgs_3_1_0,
  GeneralTransferManagerModifyInvestorFlagEventArgs_3_1_0,
  CappedSTOEvents_3_0_0,
  CappedSTOPauseEventArgs_3_0_0,
  CappedSTOEvents_3_1_0,
  CappedSTOPauseEventArgs_3_1_0,
  USDTieredSTOEvents_3_0_0,
  USDTieredSTOPauseEventArgs_3_0_0,
  USDTieredSTOEvents_3_1_0,
  USDTieredSTOPauseEventArgs_3_1_0,
  ERC20DividendCheckpointEvents_3_0_0,
  ERC20DividendCheckpointERC20DividendDepositedEventArgs_3_0_0,
  ERC20DividendCheckpointERC20DividendClaimedEventArgs_3_0_0,
  ERC20DividendCheckpointERC20DividendReclaimedEventArgs_3_0_0,
  ERC20DividendCheckpointSetWalletEventArgs_3_0_0,
  ERC20DividendCheckpointSetWithholdingEventArgs_3_0_0,
  EtherDividendCheckpointEvents_3_0_0,
  EtherDividendCheckpointEtherDividendDepositedEventArgs_3_0_0,
  EtherDividendCheckpointEtherDividendClaimedEventArgs_3_0_0,
  EtherDividendCheckpointEtherDividendReclaimedEventArgs_3_0_0,
  EtherDividendCheckpointSetWalletEventArgs_3_0_0,
  EtherDividendCheckpointSetWithholdingEventArgs_3_0_0,
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

interface FindCheckpointCreatedParams_3_0_0 extends FindEventParams {
  eventName: SecurityTokenEvents_3_0_0.CheckpointCreated;
}

interface FindModuleAddedParams_3_0_0 extends FindEventParams {
  eventName: SecurityTokenEvents_3_0_0.ModuleAdded;
}

interface FindControllerTransferParams_3_0_0 extends FindEventParams {
  eventName: SecurityTokenEvents_3_0_0.ControllerTransfer;
}

interface FindErc20DividendDepositedParams_3_0_0 extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents_3_0_0.ERC20DividendDeposited;
}

interface FindEtherDividendDepositedParams_3_0_0 extends FindEventParams {
  eventName: EtherDividendCheckpointEvents_3_0_0.EtherDividendDeposited;
}

interface FindModifyKycDataParams_3_0_0 extends FindEventParams {
  eventName: GeneralTransferManagerEvents_3_0_0.ModifyKYCData;
}

interface FindModifyInvestorFlagParams_3_0_0 extends FindEventParams {
  eventName: GeneralTransferManagerEvents_3_0_0.ModifyInvestorFlag;
}

interface FindModifyKycDataParams_3_1_0 extends FindEventParams {
  eventName: GeneralTransferManagerEvents_3_1_0.ModifyKYCData;
}

interface FindModifyInvestorFlagParams_3_1_0 extends FindEventParams {
  eventName: GeneralTransferManagerEvents_3_1_0.ModifyInvestorFlag;
}

interface FindCappedStoPauseParams_3_0_0 extends FindEventParams {
  eventName: CappedSTOEvents_3_0_0.Pause;
}

interface FindUsdTieredStoPauseParams_3_0_0 extends FindEventParams {
  eventName: USDTieredSTOEvents_3_0_0.Pause;
}

interface FindCappedStoPauseParams_3_1_0 extends FindEventParams {
  eventName: CappedSTOEvents_3_1_0.Pause;
}

interface FindUsdTieredStoPauseParams_3_1_0 extends FindEventParams {
  eventName: USDTieredSTOEvents_3_1_0.Pause;
}

interface FindErc20DividendClaimedParams_3_0_0 extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents_3_0_0.ERC20DividendClaimed;
}

interface FindEthDividendClaimedParams_3_0_0 extends FindEventParams {
  eventName: EtherDividendCheckpointEvents_3_0_0.EtherDividendClaimed;
}

interface FindErc20DividendReclaimedParams_3_0_0 extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents_3_0_0.ERC20DividendReclaimed;
}

interface FindEthDividendReclaimedParams_3_0_0 extends FindEventParams {
  eventName: EtherDividendCheckpointEvents_3_0_0.EtherDividendReclaimed;
}

interface FindErc20SetWalletParams_3_0_0 extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents_3_0_0.SetWallet;
}

interface FindEthSetWalletParams_3_0_0 extends FindEventParams {
  eventName: EtherDividendCheckpointEvents_3_0_0.SetWallet;
}

interface FindErc20SetWithholdingParams_3_0_0 extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents_3_0_0.SetWithholding;
}

interface FindEthSetWithholdingParams_3_0_0 extends FindEventParams {
  eventName: EtherDividendCheckpointEvents_3_0_0.SetWithholding;
}

interface FindEvents {
  (params: FindTickerRegisteredParams): LogWithDecodedArgs<
    SecurityTokenRegistryRegisterTickerEventArgs
  >[];
  (params: FindNewSecurityTokenParams): LogWithDecodedArgs<
    SecurityTokenRegistryNewSecurityTokenEventArgs
  >[];
  (params: FindModuleAddedParams_3_0_0): LogWithDecodedArgs<
    SecurityTokenModuleAddedEventArgs_3_0_0
  >[];
  (params: FindCheckpointCreatedParams_3_0_0): LogWithDecodedArgs<
    SecurityTokenCheckpointCreatedEventArgs_3_0_0
  >[];
  (params: FindControllerTransferParams_3_0_0): LogWithDecodedArgs<
    SecurityTokenControllerTransferEventArgs_3_0_0
  >[];
  (params: FindErc20DividendDepositedParams_3_0_0): LogWithDecodedArgs<
    ERC20DividendCheckpointERC20DividendDepositedEventArgs_3_0_0
  >[];
  (params: FindEtherDividendDepositedParams_3_0_0): LogWithDecodedArgs<
    EtherDividendCheckpointEtherDividendDepositedEventArgs_3_0_0
  >[];
  (params: FindModifyKycDataParams_3_0_0): LogWithDecodedArgs<
    GeneralTransferManagerModifyKYCDataEventArgs_3_0_0
  >[];
  (params: FindModifyInvestorFlagParams_3_0_0): LogWithDecodedArgs<
    GeneralTransferManagerModifyInvestorFlagEventArgs_3_0_0
  >[];
  (params: FindModifyKycDataParams_3_1_0): LogWithDecodedArgs<
    GeneralTransferManagerModifyKYCDataEventArgs_3_1_0
  >[];
  (params: FindModifyInvestorFlagParams_3_1_0): LogWithDecodedArgs<
    GeneralTransferManagerModifyInvestorFlagEventArgs_3_1_0
  >[];
  (params: FindCappedStoPauseParams_3_0_0): LogWithDecodedArgs<CappedSTOPauseEventArgs_3_0_0>[];
  (params: FindUsdTieredStoPauseParams_3_0_0): LogWithDecodedArgs<
    USDTieredSTOPauseEventArgs_3_0_0
  >[];
  (params: FindCappedStoPauseParams_3_1_0): LogWithDecodedArgs<CappedSTOPauseEventArgs_3_1_0>[];
  (params: FindUsdTieredStoPauseParams_3_1_0): LogWithDecodedArgs<
    USDTieredSTOPauseEventArgs_3_1_0
  >[];
  (params: FindErc20DividendClaimedParams_3_0_0): LogWithDecodedArgs<
    ERC20DividendCheckpointERC20DividendClaimedEventArgs_3_0_0
  >[];
  (params: FindEthDividendClaimedParams_3_0_0): LogWithDecodedArgs<
    EtherDividendCheckpointEtherDividendClaimedEventArgs_3_0_0
  >[];
  (params: FindErc20DividendReclaimedParams_3_0_0): LogWithDecodedArgs<
    ERC20DividendCheckpointERC20DividendReclaimedEventArgs_3_0_0
  >[];
  (params: FindEthDividendReclaimedParams_3_0_0): LogWithDecodedArgs<
    EtherDividendCheckpointEtherDividendReclaimedEventArgs_3_0_0
  >[];
  (params: FindErc20SetWalletParams_3_0_0): LogWithDecodedArgs<
    ERC20DividendCheckpointSetWalletEventArgs_3_0_0
  >[];
  (params: FindEthSetWalletParams_3_0_0): LogWithDecodedArgs<
    EtherDividendCheckpointSetWalletEventArgs_3_0_0
  >[];
  (params: FindErc20SetWithholdingParams_3_0_0): LogWithDecodedArgs<
    ERC20DividendCheckpointSetWithholdingEventArgs_3_0_0
  >[];
  (params: FindEthSetWithholdingParams_3_0_0): LogWithDecodedArgs<
    EtherDividendCheckpointSetWithholdingEventArgs_3_0_0
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
