import { SubModule } from '../SubModule';
import { CountRestrictions } from './CountRestrictions';
import { PercentageRestrictions } from './PercentageRestrictions';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';

export class Restrictions extends SubModule {
  public count: CountRestrictions;

  public percentage: PercentageRestrictions;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.count = new CountRestrictions(securityToken, context);
    this.percentage = new PercentageRestrictions(securityToken, context);
  }
}
