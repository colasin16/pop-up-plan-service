import { EnumValueObject } from "../utils/EnumValueObject";

export enum ECategory {
  RUN,
  WALK,
}

export class Category extends EnumValueObject<ECategory> {
  constructor(value: ECategory | string) {
    super(ECategory, value);
  }
}
