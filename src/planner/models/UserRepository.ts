import { Identifier } from "./Identifier";
import { User } from "./User";

export interface UserRepository {
  create(user: User): void;
  find(id: Identifier): User | null;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): void;
  delete(id: Identifier): void;
}
