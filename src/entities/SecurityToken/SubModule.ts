import { SecurityToken } from './SecurityToken';
import { Context } from '../../Context';

/**
 * SubModule implementation used to references ST and Context
 *
 * - Holds the context in which the SDK is being used
 * - Holds the Secutity Token implementation
 */
export class SubModule {
  protected securityToken: SecurityToken;

  protected context: Context;

  constructor(securityToken: SecurityToken, context: Context) {
    this.securityToken = securityToken;
    this.context = context;
  }
}
