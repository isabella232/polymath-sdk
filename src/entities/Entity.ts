/**
 * Represents an object or resource in the Polymath Ecosystem with its own set of properties and functionality
 */
export abstract class Entity<Params> {
  public abstract uid: string;

  public abstract toPojo(): any;

  public abstract _refresh(params: Partial<Params>): void;
}
