import { Repository } from "../../core/Repository";
import { UserModel } from "./User";

export interface UserRepository extends Repository<UserModel> {
  findByEmail(email: string): Promise<UserModel | null>;
}
