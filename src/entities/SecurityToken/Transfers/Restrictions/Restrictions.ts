/**
 * @packageDocumentation
 * @module Entities.SecurityToken.Transfers.Restrictions
 */

import { SubModule } from '../../SubModule';
import { CountRestrictions } from './CountRestrictions';
import { PercentageRestrictions } from './PercentageRestrictions';
import { SecurityToken } from '../../SecurityToken';
import { Context } from '../../../../base/Context';

/**
 * Namespace that handles all Transfer Restriction related functionality
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
