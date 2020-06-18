import { SecurityToken, Params, UniqueIdentifiers } from '../SecurityToken';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { convertVersionToEnum } from '../../utils';

/**
 * @hidden
 * Generates Security Token entities
 */
export class SecurityTokenFactory extends Factory<SecurityToken, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { symbol } = SecurityToken.unserialize(uid);
    const {
      context: { contractWrappers },
    } = this;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [
      name,
      owner,
      address,
      tokenDetails,
      versionArray,
      granularity,
      totalSupply,
      treasuryWallet,
      currentCheckpoint,
    ] = await Promise.all([
      securityToken.name(),
      securityToken.owner(),
      securityToken.address(),
      securityToken.tokenDetails(),
      securityToken.getVersion(),
      securityToken.granularity(),
      securityToken.totalSupply(),
      securityToken.getTreasuryWallet(),
      securityToken.currentCheckpointId(),
    ]);

    return {
      name,
      owner,
      address,
      tokenDetails,
      version: convertVersionToEnum(versionArray),
      granularity,
      totalSupply,
      currentCheckpoint: currentCheckpoint.toNumber(),
      treasuryWallet,
    };
  };

  // eslint-disable-next-line require-jsdoc
  constructor(context: Context) {
    super(SecurityToken, context);
  }
}
