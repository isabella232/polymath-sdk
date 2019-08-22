export abstract class Entity<Params> {
  public abstract uid: string;

  public abstract toPojo(): any;

  public abstract _refresh(params: Partial<Params>): void;
}
