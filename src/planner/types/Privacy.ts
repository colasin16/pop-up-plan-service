import { EnumValueObject } from "../utils/EnumValueObject";

export enum EPrivacy {
  PRIVATE,
  PUBLIC,
}

export class Privacy extends EnumValueObject<EPrivacy> {
  constructor(value: EPrivacy | string) {
    super(EPrivacy, value);
  }
}
