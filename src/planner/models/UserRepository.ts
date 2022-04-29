import { Identifier } from "./Identifier";
import { UserModel } from "./User";

export interface UserRepository {
  create(user: UserModel): Promise<UserModel | null>;
  find(id: Identifier): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  update(user: UserModel): void;
  delete(id: Identifier): void;
}
