import { ObjectId } from "bson";

export class Identifier {
  private readonly _value: ObjectId;

  public static fromString(id: string): Identifier {
    return new Identifier(new ObjectId(id));
  }

  constructor(id?: ObjectId) {
    this._value = id || new ObjectId();
  }

  public equals(id: Identifier) {
    return this._value === id._value;
  }

  public toString(): string {
    return this._value.toHexString();
  }
}
