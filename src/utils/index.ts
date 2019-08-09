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

interface FindERC20DividendDepositedParams extends FindEventParams {
  eventName: ERC20DividendCheckpointEvents.ERC20DividendDeposited;
}

interface FindEtherDividendDepositedParams extends FindEventParams {
  eventName: EtherDividendCheckpointEvents.EtherDividendDeposited;
}

interface FindModuleAddedParams extends FindEventParams {
  eventName: SecurityTokenEvents.ModuleAdded;
}

interface FindEvent {
  (params: FindTickerRegisteredParams):
    | LogWithDecodedArgs<SecurityTokenRegistryRegisterTickerEventArgs>
    | undefined;
  (params: FindNewSecurityTokenParams):
    | LogWithDecodedArgs<SecurityTokenRegistryNewSecurityTokenEventArgs>
    | undefined;
  (params: FindModuleAddedParams):
    | LogWithDecodedArgs<SecurityTokenModuleAddedEventArgs>
    | undefined;
  (params: FindCheckpointCreatedParams):
    | LogWithDecodedArgs<SecurityTokenCheckpointCreatedEventArgs>
    | undefined;
  (params: FindERC20DividendDepositedParams):
    | LogWithDecodedArgs<ERC20DividendCheckpointERC20DividendDepositedEventArgs>
    | undefined;
  (params: FindEtherDividendDepositedParams):
    | LogWithDecodedArgs<EtherDividendCheckpointEtherDividendDepositedEventArgs>
    | undefined;
}

export const findEvent: FindEvent = ({
  logs,
  eventName,
}: {
  logs: (LogEntry | LogWithDecodedArgs<DecodedLogArgs>)[];
  eventName: ContractEvents;
}): any => {
  const foundLog = logs.find(log => {
    const l = log as LogWithDecodedArgs<DecodedLogArgs>;

    return l.event === eventName;
  });

  return foundLog;
};
