import { Identifier } from "./Identifier";
import { UserPrimitives } from "./primitives/UserPrimitives";
import { User } from "./User";

export interface UserRepository {
  create(user: User): Promise<Identifier>;
  find(id: Identifier): User | null;
  findByEmail(email: string): Promise<UserPrimitives | null>;
  update(user: User): void;
  delete(id: Identifier): void;
}
