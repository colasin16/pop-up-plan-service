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
    return typeof this._value === "string" ? this._value : this._value.toHexString();
  }
}
