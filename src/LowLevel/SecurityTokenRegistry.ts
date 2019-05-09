import { TransactionObject } from 'web3/eth/types';
import BigNumber from 'bignumber.js';
import { SecurityTokenRegistryAbi } from './abis/SecurityTokenRegistryAbi';
import { Contract } from './Contract';
import { SecurityToken } from './SecurityToken';
import { Context } from './LowLevel';
import {
  GenericContract,
  RegisterTickerArgs,
  GenerateSecurityTokenArgs,
  GetSecurityTokenArgs,
  GetTickerDetailsArgs,
  IsTickerAvailableArgs,
  TickerDetails,
} from './types';
import { fromWei } from './utils';

interface SecurityTokenRegistryContract extends GenericContract {
  methods: {
    registerTicker(
      owner: string,
      ticker: string,
      tokenName: string
    ): TransactionObject<void>;
    getTickerDetails(
      ticker: string
    ): TransactionObject<{ [key: string]: string }>;
    getTickerRegistrationFee(): TransactionObject<string>;
    getSecurityTokenLaunchFee(): TransactionObject<string>;
    getSecurityTokenAddress(ticker: string): TransactionObject<string>;
    generateSecurityToken(
      name: string,
      ticker: string,
      tokenDetails: string,
      divisible: boolean
    ): TransactionObject<void>;
  };
}

export class SecurityTokenRegistry extends Contract<
  SecurityTokenRegistryContract
> {
  constructor({ address, context }: { address: string; context: Context }) {
    super({ address, abi: SecurityTokenRegistryAbi.abi, context });
  }

  public registerTicker = async ({
    owner,
    ticker,
    tokenName,
  }: RegisterTickerArgs) => {
    return () =>
      this.contract.methods
        .registerTicker(owner, ticker, tokenName)
        .send({ from: this.context.account });
  };

  public getTickerDetails = async ({ ticker }: GetTickerDetailsArgs) => {
    const keysMap: { [key: string]: string } = {
      '0': 'owner',
      '1': 'registrationDate',
      '2': 'expiryDate',
      '3': 'name',
      '4': 'status',
    };

    const details = await this.contract.methods
      .getTickerDetails(ticker)
      .call({ from: this.context.account });

    // Convert the object returned by SecurityTokenRegistry.getTickerDetails to a TickerDetails object.
    try {
      const initialValue = {} as TickerDetails;
      const labeledDetails: TickerDetails = Object.keys(details).reduce(
        (acc, cur: string) => {
          let val: string | number = details[cur];
          // Parse unix timestamps.
          if (cur === '1' || cur === '2') {
            val = parseInt(val);
          }
          const newKey: string = keysMap[cur];
          acc[newKey] = val;
          return acc;
        },
        initialValue
      );

      return labeledDetails;
    } catch (error) {
      throw new Error('Unexpected ticker details data.');
    }
  };

  /**
   * While lacking a public, smart contract function to check for ticker availability, this function attempts to
   * immitate the internal function SecurityTokenRegistry._tickerAvailable()
   * @see https://github.com/PolymathNetwork/polymath-core/blob/aa635df01588f733ce95bc13fe319c7d3c858a24/contracts/SecurityTokenRegistry.sol#L318
   */
  public isTickerAvailable = async ({
    ticker,
  }: IsTickerAvailableArgs): Promise<boolean> => {
    const details = await this.getTickerDetails({ ticker });

    if (details.owner !== '0x0000000000000000000000000000000000000000') {
      if (Date.now() > details.expiryDate * 1000 && !details.status) {
        return true;
      }
      return false;
    }

    return true;
  };

  public generateSecurityToken = async ({
    tokenName,
    ticker,
    tokenDetails,
    divisible,
  }: GenerateSecurityTokenArgs) => {
    return () =>
      this.contract.methods
        .generateSecurityToken(tokenName, ticker, tokenDetails, divisible)
        .send({ from: this.context.account });
  };

  public async getTickerRegistrationFee() {
    const feeRes = await this.contract.methods
      .getTickerRegistrationFee()
      .call();
    return fromWei(feeRes);
  }

  public async getSecurityTokenLaunchFee() {
    const feeRes = await this.contract.methods
      .getSecurityTokenLaunchFee()
      .call();
    return fromWei(feeRes);
  }

  public async getSecurityToken({ ticker }: GetSecurityTokenArgs) {
    const address = await this.contract.methods
      .getSecurityTokenAddress(ticker)
      .call();

    return new SecurityToken({ address, context: this.context });
  }
}
