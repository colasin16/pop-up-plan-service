import { ObjectID } from "bson";

export class Identifier {
  private readonly _value: ObjectID;

  constructor(id?: ObjectID) {
    this._value = id || new ObjectID();
  }

  public equals(id: Identifier) {
    return this._value === id._value;
  }

  public toString(): string {
    return this._value.toHexString();
  }

  public static fromString(id: string): Identifier {
    return new Identifier(new ObjectID(id));
  }
}
