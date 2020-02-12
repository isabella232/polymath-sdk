/**
 * @packageDocumentation
 * @module Entities.SecurityToken
 */

import { SecurityToken } from './SecurityToken';
import { Context } from '../../Context';

/**
 * Represents a namespace inside the Security Token that handles a set of related functionality
 */
export class SubModule {
  protected securityToken: SecurityToken;

  protected context: Context;

  /**
   * Create a new SubModule instance
   */
  constructor(securityToken: SecurityToken, context: Context) {
    this.securityToken = securityToken;
    this.context = context;
  }
}
