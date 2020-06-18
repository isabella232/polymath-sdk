import { Factories } from '~/Context';
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as securityTokenFactoryModule from '../entities/factories/SecurityTokenFactory';
import * as simpleStoFactoryModule from '../entities/factories/SimpleStoFactory';
import * as checkpointFactoryModule from '../entities/factories/CheckpointFactory';
import * as dividendDistributionFactoryModule from '../entities/factories/DividendDistributionFactory';
import * as erc20TokenBalanceFactoryModule from '../entities/factories/Erc20TokenBalanceFactory';
import * as investmentFactoryModule from '../entities/factories/InvestmentFactory';
import * as securityTokenReservationModule from '../entities/factories/SecurityTokenReservationFactory';
import * as tokenholderFactoryModule from '../entities/factories/TokenholderFactory';
import * as tieredStoFactoryModule from '../entities/factories/TieredStoFactory';
import * as taxWithholdingFactoryModule from '../entities/factories/TaxWithholdingFactory';

let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
let simpleStoFactoryMock: MockManager<simpleStoFactoryModule.SimpleStoFactory>;
let checkpointFactoryMock: MockManager<checkpointFactoryModule.CheckpointFactory>;
let dividendDistributionFactoryMock: MockManager<
  dividendDistributionFactoryModule.DividendDistributionFactory
>;
let erc20TokenBalanceFactoryMock: MockManager<
  erc20TokenBalanceFactoryModule.Erc20TokenBalanceFactory
>;
let investmentFactoryMock: MockManager<investmentFactoryModule.InvestmentFactory>;
let securityTokenReservationFactoryMock: MockManager<
  securityTokenReservationModule.SecurityTokenReservationFactory
>;
let tokenholderFactoryMock: MockManager<tokenholderFactoryModule.TokenholderFactory>;
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
  simpleStoFactoryMock = ImportMock.mockClass(simpleStoFactoryModule, 'SimpleStoFactory');
  checkpointFactoryMock = ImportMock.mockClass(checkpointFactoryModule, 'CheckpointFactory');
  dividendDistributionFactoryMock = ImportMock.mockClass(
    dividendDistributionFactoryModule,
    'DividendDistributionFactory'
  );
  erc20TokenBalanceFactoryMock = ImportMock.mockClass(
    erc20TokenBalanceFactoryModule,
    'Erc20TokenBalanceFactory'
  );
  investmentFactoryMock = ImportMock.mockClass(investmentFactoryModule, 'InvestmentFactory');
  securityTokenReservationFactoryMock = ImportMock.mockClass(
    securityTokenReservationModule,
    'SecurityTokenReservationFactory'
  );
  tokenholderFactoryMock = ImportMock.mockClass(tokenholderFactoryModule, 'TokenholderFactory');
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
    simpleStoFactory: simpleStoFactoryMock.getMockInstance(),
    tieredStoFactory: tieredStoFactoryMock.getMockInstance(),
    dividendDistributionFactory: dividendDistributionFactoryMock.getMockInstance(),
    checkpointFactory: checkpointFactoryMock.getMockInstance(),
    tokenholderFactory: tokenholderFactoryMock.getMockInstance(),
    taxWithholdingFactory: taxWithholdingFactoryMock.getMockInstance(),
  };
};
