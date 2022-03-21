import { Identifier } from "./Identifier";
import { IRepository } from "./IRespository";
import { User } from "./User";

export interface UserRepository extends IRepository {
  create(user: User): void;
  find(id: Identifier): User | null;
  update(user: User): void;
  delete(id: Identifier): void;
}
