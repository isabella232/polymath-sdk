import { SecurityToken } from './SecurityToken';
import { Context } from '../../Context';

export class SubModule {
  protected securityToken: SecurityToken;

  protected context: Context;

  constructor(securityToken: SecurityToken, context: Context) {
    this.securityToken = securityToken;
    this.context = context;
  }
}
