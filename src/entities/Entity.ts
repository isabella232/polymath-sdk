export abstract class Entity {
  public abstract uid: string;

  public abstract toPojo(): any;
}
