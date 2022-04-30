import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserRepository } from "../../models/user/UserRepository";
import { FullName } from "../../types/FullName";
import { User } from "../../models/user/User";
import { Identifier } from "../../models/Identifier";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserController {
  public async control(message: CreateUserMessage): Promise<Identifier | null> {
    const userRepository: UserRepository = new MongoUserRepository();

    const user = new User(
      message.name,
      message.email,
      message.phoneNumber,
      message.password
    );

    // const createdUser = repo.create(user): User;
    // if NullObject.isnull(createdUser)
    // throw ....

    await userRepository.create(user);
    return user.getId();
  }
}
