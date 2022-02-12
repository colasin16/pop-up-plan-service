export class EnumValueObject<T> {
  private readonly _value: T | string;

  constructor(enumerate: { [t: number]: string }, value: T | string) {
    if (!Object.values(enumerate).includes(value as any)) {
      throw new Error("Value not in enumerable");
    }
    this._value = value;
  }

  get value(): T {
    return this._value as T;
  }

  public equals(other: EnumValueObject<T>): boolean {
    if (
      other === null ||
      other === undefined ||
      !(other instanceof EnumValueObject)
    ) {
      return false;
    }
    return other._value === this._value;
  }
}
