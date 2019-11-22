import { Factories } from '~/Context';
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as securityTokenFactoryModule from '../entities/factories/SecurityTokenFactory';
import * as cappedStoFactoryModule from '~/entities/factories/CappedStoFactory';
import * as checkpointFactoryModule from '~/entities/factories/CheckpointFactory';
import * as dividendDistributionFactoryModule from '~/entities/factories/DividendDistributionFactory';
import * as erc20DividendsManagerFactoryModule from '~/entities/factories/Erc20DividendsManagerFactory';
import * as erc20TokenBalanceFactoryModule from '~/entities/factories/Erc20TokenBalanceFactory';
import * as ethDividendsManagerFactoryModule from '~/entities/factories/EthDividendsManagerFactory';
import * as investmentFactoryModule from '~/entities/factories/InvestmentFactory';
import * as securityTokenReservationModule from '~/entities/factories/SecurityTokenReservationFactory';
import * as shareholderFactoryModule from '~/entities/factories/ShareholderFactory';
import * as tieredStoFactoryModule from '~/entities/factories/TieredStoFactory';
import * as taxWithholdingFactoryModule from '~/entities/factories/TaxWithholdingFactory';

let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
let cappedStoFactoryMock: MockManager<cappedStoFactoryModule.CappedStoFactory>;
let checkpointFactoryMock: MockManager<checkpointFactoryModule.CheckpointFactory>;
let dividendDistributionFactoryMock: MockManager<
  dividendDistributionFactoryModule.DividendDistributionFactory
>;
let erc20DividendsManagerFactoryMock: MockManager<
  erc20DividendsManagerFactoryModule.Erc20DividendsManagerFactory
>;
let erc20TokenBalanceFactoryMock: MockManager<
  erc20TokenBalanceFactoryModule.Erc20TokenBalanceFactory
>;
let ethDividendsManagerFactoryMock: MockManager<
  ethDividendsManagerFactoryModule.EthDividendsManagerFactory
>;
let investmentFactoryMock: MockManager<investmentFactoryModule.InvestmentFactory>;
let securityTokenReservationFactoryMock: MockManager<
  securityTokenReservationModule.SecurityTokenReservationFactory
>;
let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;
let taxWithholdingFactoryMock: MockManager<taxWithholdingFactoryModule.TaxWithholdingFactory>;

/**
 * This method will return a mock of the context factories interface
 */
export const mockFactories = (): Factories => {
  securityTokenFactoryMock = ImportMock.mockClass(
    securityTokenFactoryModule,
    'SecurityTokenFactory'
  );
  cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryModule, 'CappedStoFactory');
  checkpointFactoryMock = ImportMock.mockClass(checkpointFactoryModule, 'CheckpointFactory');
  dividendDistributionFactoryMock = ImportMock.mockClass(
    dividendDistributionFactoryModule,
    'DividendDistributionFactory'
  );
  erc20DividendsManagerFactoryMock = ImportMock.mockClass(
    erc20DividendsManagerFactoryModule,
    'Erc20DividendsManagerFactory'
  );
  erc20TokenBalanceFactoryMock = ImportMock.mockClass(
    erc20TokenBalanceFactoryModule,
    'Erc20TokenBalanceFactory'
  );
  ethDividendsManagerFactoryMock = ImportMock.mockClass(
    ethDividendsManagerFactoryModule,
    'EthDividendsManagerFactory'
  );
  investmentFactoryMock = ImportMock.mockClass(investmentFactoryModule, 'InvestmentFactory');
  securityTokenReservationFactoryMock = ImportMock.mockClass(
    securityTokenReservationModule,
    'SecurityTokenReservationFactory'
  );
  shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
  tieredStoFactoryMock = ImportMock.mockClass(tieredStoFactoryModule, 'TieredStoFactory');
  taxWithholdingFactoryMock = ImportMock.mockClass(
    taxWithholdingFactoryModule,
    'TaxWithholdingFactory'
  );

  return {
    securityTokenFactory: securityTokenFactoryMock.getMockInstance(),
    securityTokenReservationFactory: securityTokenReservationFactoryMock.getMockInstance(),
    erc20TokenBalanceFactory: erc20TokenBalanceFactoryMock.getMockInstance(),
    investmentFactory: investmentFactoryMock.getMockInstance(),
    cappedStoFactory: cappedStoFactoryMock.getMockInstance(),
    tieredStoFactory: tieredStoFactoryMock.getMockInstance(),
    dividendDistributionFactory: dividendDistributionFactoryMock.getMockInstance(),
    checkpointFactory: checkpointFactoryMock.getMockInstance(),
    erc20DividendsManagerFactory: erc20DividendsManagerFactoryMock.getMockInstance(),
    ethDividendsManagerFactory: ethDividendsManagerFactoryMock.getMockInstance(),
    shareholderFactory: shareholderFactoryMock.getMockInstance(),
    taxWithholdingFactory: taxWithholdingFactoryMock.getMockInstance(),
  };
};
