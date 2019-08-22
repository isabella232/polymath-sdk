import { SecurityToken, Params, UniqueIdentifiers } from '../SecurityToken';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';

export class SecurityTokenFactory extends Factory<SecurityToken, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { symbol } = SecurityToken.unserialize(uid);

    let securityToken;

    try {
      securityToken = await this.context.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [name, owner, address] = await Promise.all([
      securityToken.name(),
      securityToken.owner(),
      securityToken.address(),
    ]);

    return { name, owner, address };
  };

  constructor(context: Context) {
    super(SecurityToken, context);
  }
}
