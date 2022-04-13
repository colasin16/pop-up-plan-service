import { EnumValueObject } from "../utils/EnumValueObject";

export enum ECategory {
  RUN = "run",
  WALK = "walk",
}

export class Category extends EnumValueObject<ECategory> {
  constructor(value: ECategory | string) {
    super(ECategory, value);
  }
}
