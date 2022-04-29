import { Repository } from "../../core/Repository";
import { UserModel } from "./UserModel";

export interface UserRepository extends Repository<UserModel> {
  findByEmail(email: string): Promise<UserModel | null>;
}
