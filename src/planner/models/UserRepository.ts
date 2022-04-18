import { Identifier } from "./Identifier";
import { UserPrimitives } from "./primitives/UserPrimitives";
import { User } from "./User";

export interface UserRepository {
  create(user: User): Promise<UserPrimitives | null>;
  find(id: Identifier): Promise<UserPrimitives | null>;
  findByEmail(email: string): Promise<UserPrimitives | null>;
  update(user: User): void;
  delete(id: Identifier): void;
}
