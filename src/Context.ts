import { Wallet } from './Wallet';
import { PolymathBase } from './PolymathBase';
import {
  SecurityTokenFactory,
  SecurityTokenReservationFactory,
  Erc20TokenBalanceFactory,
  InvestmentFactory,
  CappedStoFactory,
  UsdTieredStoFactory,
  DividendDistributionFactory,
  CheckpointFactory,
  Erc20DividendsManagerFactory,
  EthDividendsManagerFactory,
  ShareholderFactory,
  TaxWithholdingFactory,
} from './entities/factories';

interface ConstructorParams {
  contractWrappers: PolymathBase;
}

interface Factories {
  securityTokenFactory: SecurityTokenFactory;
  securityTokenReservationFactory: SecurityTokenReservationFactory;
  erc20TokenBalanceFactory: Erc20TokenBalanceFactory;
  investmentFactory: InvestmentFactory;
  cappedStoFactory: CappedStoFactory;
  usdTieredStoFactory: UsdTieredStoFactory;
  dividendDistributionFactory: DividendDistributionFactory;
  checkpointFactory: CheckpointFactory;
  erc20DividendsManagerFactory: Erc20DividendsManagerFactory;
  ethDividendsManagerFactory: EthDividendsManagerFactory;
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
      cappedStoFactory: new CappedStoFactory(this),
      usdTieredStoFactory: new UsdTieredStoFactory(this),
      dividendDistributionFactory: new DividendDistributionFactory(this),
      checkpointFactory: new CheckpointFactory(this),
      erc20DividendsManagerFactory: new Erc20DividendsManagerFactory(this),
      ethDividendsManagerFactory: new EthDividendsManagerFactory(this),
      shareholderFactory: new ShareholderFactory(this),
      taxWithholdingFactory: new TaxWithholdingFactory(this),
    };
  }
}
