import { Entity } from "../../types/entity";

interface UserName {
  firstName: string;
  lastName: string;
}

export interface User extends Entity {
  name: UserName;
}
