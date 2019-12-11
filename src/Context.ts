import { Wallet } from './Wallet';
import { PolymathBase } from './PolymathBase';
import {
  SecurityTokenFactory,
  SecurityTokenReservationFactory,
  Erc20TokenBalanceFactory,
  InvestmentFactory,
  SimpleStoFactory,
  TieredStoFactory,
  DividendDistributionFactory,
  CheckpointFactory,
  ShareholderFactory,
  TaxWithholdingFactory,
} from './entities/factories';

interface ConstructorParams {
  contractWrappers: PolymathBase;
}

export interface Factories {
  securityTokenFactory: SecurityTokenFactory;
  securityTokenReservationFactory: SecurityTokenReservationFactory;
  erc20TokenBalanceFactory: Erc20TokenBalanceFactory;
  investmentFactory: InvestmentFactory;
  simpleStoFactory: SimpleStoFactory;
  tieredStoFactory: TieredStoFactory;
  dividendDistributionFactory: DividendDistributionFactory;
  checkpointFactory: CheckpointFactory;
  shareholderFactory: ShareholderFactory;
  taxWithholdingFactory: TaxWithholdingFactory;
}

/**
 * Context in which the SDK is being used
 *
 * - Holds the current instance of the contract wrappers
 * - Holds the current wallet
 * - Holds the factories that create and cache entities
 */
export class Context {
  public contractWrappers: PolymathBase;

  public currentWallet: Wallet;

  public factories: Factories;

  constructor(params: ConstructorParams) {
    const { contractWrappers } = params;

    this.contractWrappers = contractWrappers;

    this.currentWallet = new Wallet({ address: () => contractWrappers.getAccount() });

    this.factories = {
      securityTokenFactory: new SecurityTokenFactory(this),
      securityTokenReservationFactory: new SecurityTokenReservationFactory(this),
      erc20TokenBalanceFactory: new Erc20TokenBalanceFactory(this),
      investmentFactory: new InvestmentFactory(this),
      simpleStoFactory: new SimpleStoFactory(this),
      tieredStoFactory: new TieredStoFactory(this),
      dividendDistributionFactory: new DividendDistributionFactory(this),
      checkpointFactory: new CheckpointFactory(this),
      shareholderFactory: new ShareholderFactory(this),
      taxWithholdingFactory: new TaxWithholdingFactory(this),
    };
  }
}
