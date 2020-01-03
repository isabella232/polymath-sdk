import { SubModule } from '../../SubModule';
import { CountRestrictions } from './CountRestrictions';
import { PercentageRestrictions } from './PercentageRestrictions';
import { SecurityToken } from '../../SecurityToken';
import { Context } from '../../../../Context';

/**
 * Restrictions implementation used to references restrictions modules
 *
 * - Holds the current instance of the Count Restrictions wrapper
 * - Holds the current instance of the Percentage Restrictions wrapper
 */
export class Restrictions extends SubModule {
  public count: CountRestrictions;

  public percentage: PercentageRestrictions;

  /**
   * Create a new Restrictions instance
   */
  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.count = new CountRestrictions(securityToken, context);
    this.percentage = new PercentageRestrictions(securityToken, context);
  }
}
