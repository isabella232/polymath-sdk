import { SubModule } from '../SubModule';
import { Restrictions } from './Restrictions';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';

export class Transfers extends SubModule {
  public restrictions: Restrictions;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.restrictions = new Restrictions(securityToken, context);
  }
}
