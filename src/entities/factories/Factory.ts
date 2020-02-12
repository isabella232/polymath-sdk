/**
 * @packageDocumentation
 * @module Entities.Factories
 */

import { merge } from 'lodash';
import { Entity } from '../Entity';
import { Context } from '../../Context';

/**
 * Represents an entity
 */
export interface EntityClass<T, U> {
  new (params: T & U, context: Context): Entity<T>;

  /**
   * unserialize serialized entity information
   */
  unserialize(uid: string): U;

  /**
   * generate a unique identifier for an entity
   */
  generateId(identifiers: U): string;
}

/**
 * Factories are tasked with creating instances of their corresponding Entity and managing the internal cache for that Entity type.
 * So, for example, the Security Token Factory is tasked with fetching necessary data to instance a Security Token,
 * as well as fetching/refreshing the internal Security Token cache
 */
export abstract class Factory<EntityType extends Entity<T>, T extends any, U extends any> {
  public cache: {
    [key: string]: EntityType | undefined;
  } = {};

  public context: Context;

  /**
   * entity class that this Factory is in charge of generating and caching
   */
  public Entity: EntityClass<T, U>;

  /**
   * @hidden
   */
  protected abstract generateProperties(uid: string): Promise<T>;

  /**
   * Create a factory that can generate an entity
   */
  constructor(eClass: EntityClass<T, U>, context: Context) {
    this.Entity = eClass;
    this.context = context;
  }

  /**
   * Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is
   *
   * @param uid - unique identifier for the entity
   */
  public async fetch(uid: string) {
    const { cache, context } = this;
    let instance = cache[uid];

    if (!instance) {
      const identifiers = this.Entity.unserialize(uid);
      const props = await this.generateProperties(uid);
      instance = new this.Entity(merge(identifiers, props), context) as EntityType;

      cache[uid] = instance;
    } else {
      /*
      TODO @monitz87: remove this as soon as we implement event-based refreshing of entities
      This line basically fetches the data again and again every time an entity is fetched,
      making the cache only good for having one central copy of each entity, but not for reducing
      the amount of requests. Once we start subscribing to relevant events in each factory and refreshing
      entities when they fire, this won't be necessary
      */
      await this.refresh(uid);
    }

    return instance;
  }

  /**
   * Get an entity from the cache. Creates it if it isn't cached, updates it if it is
   *
   * @param uid - unique identifier for the entity
   * @param params - constructor data for the entity
   */
  public create(uid: string, params: T) {
    const { cache, context } = this;
    let instance = cache[uid];

    if (!instance) {
      const identifiers = this.Entity.unserialize(uid);
      instance = new this.Entity(merge(identifiers, params), context) as EntityType;

      cache[uid] = instance;
    } else {
      instance._refresh(params);
    }

    return instance;
  }

  /**
   * Fetch the data for an entity and updates its properties
   *
   * @param uid - unique identifier for the entity
   */
  public async refresh(uid: string) {
    const instance = this.cache[uid];

    if (!instance) {
      return;
    }

    const props = await this.generateProperties(uid);

    instance._refresh(props);
  }

  /**
   * Update an entity's properties in place
   *
   * @param uid - unique identifier for the entity
   * @param params - properties that should be updated
   */
  public async update(uid: string, params: Partial<T>) {
    const instance = this.cache[uid];

    if (!instance) {
      return;
    }

    instance._refresh(params);
  }
}
