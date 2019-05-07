import { Polymath } from '../Polymath';
import { Entity } from '../entities/Entity';
import { serialize, unserialize } from '../utils';
import { DividendModuleTypes } from '../LowLevel/types';
import BigNumber from 'bignumber.js';
import { TaxWithholdingEntry } from '../types';

interface UniqueIdentifiers {
  address: string;
}

function isUniqueIdentifiers(
  identifiers: any
): identifiers is UniqueIdentifiers {
  const { address } = identifiers;

  return typeof address === 'string';
}

interface Params extends UniqueIdentifiers {
  symbol: string;
  name: string;
}

interface ExcludedArgs {
  symbol: string;
}

export class SecurityToken extends Entity {
  public static generateId({ address }: UniqueIdentifiers) {
    return serialize('securityToken', {
      address,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new Error('Wrong security token ID format.');
    }

    return unserialized;
  }

  public uid: string;
  public symbol: string;
  public name: string;
  public address: string;

  constructor(params: Params, polyClient?: Polymath) {
    super(polyClient);

    const { symbol, name, address } = params;

    this.symbol = symbol;
    this.name = name;
    this.address = address;
    this.uid = SecurityToken.generateId({ address });
  }

  public getErc20DividendsModule = () =>
    this.polyClient.getErc20DividendsModule({
      symbol: this.symbol,
    });

  public enableDividendModules = (args: {
    storageWalletAddress: string;
    types: DividendModuleTypes[];
  }) =>
    this.polyClient.enableDividendModules({
      ...args,
      symbol: this.symbol,
    });

  public getCheckpoints = (args: { dividendTypes: DividendModuleTypes[] }) =>
    this.polyClient.getCheckpoints({
      ...args,
      symbol: this.symbol,
    });

  public getCheckpoint = (args: {
    checkpointIndex: number;
    dividendTypes: DividendModuleTypes[];
  }) =>
    this.polyClient.getCheckpoint({
      ...args,
      symbol: this.symbol,
    });

  public createCheckpoint = () =>
    this.polyClient.createCheckpoint({ symbol: this.symbol });

  public createPolyDividendDistribution = (args: {
    maturityDate: Date;
    expiryDate: Date;
    amount: BigNumber;
    checkpointIndex: number;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) =>
    this.polyClient.createPolyDividendDistribution({
      ...args,
      symbol: this.symbol,
    });

  public createErc20DividendDistribution = (args: {
    maturityDate: Date;
    expiryDate: Date;
    erc20Address: string;
    amount: BigNumber;
    checkpointIndex: number;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) =>
    this.polyClient.createErc20DividendDistribution({
      ...args,
      symbol: this.symbol,
    });

  public createEthDividendDistribution = (args: {
    symbol: string;
    maturityDate: Date;
    expiryDate: Date;
    erc20Address: string;
    amount: BigNumber;
    checkpointIndex: number;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) =>
    this.polyClient.createEthDividendDistribution({
      ...args,
      symbol: this.symbol,
    });

  public toPojo() {
    const { uid, symbol, name, address } = this;

    return { uid, symbol, name, address };
  }
}
