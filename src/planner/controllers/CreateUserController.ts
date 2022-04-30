import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserPrimitives } from "../models/user/UserPrimitives";
import { UserRepository } from "../models/user/UserRepository";
import { FullName } from "../types/FullName";
import { User } from "../models/user/User";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserController {
  public async control(
    message: CreateUserMessage
  ): Promise<UserPrimitives | null> {
    const userRepository: UserRepository = new MongoUserRepository();

    const user = await User.build(
      message.name,
      message.email,
      message.phoneNumber,
      message.password
    );

    return await userRepository.create(user);
  }
}
