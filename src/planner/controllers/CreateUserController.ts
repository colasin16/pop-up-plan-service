import { container } from "tsyringe";
import { MongoDBClient } from "../infrastructure/mongo-db/MongoDBClient";
import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { Identifier } from "../models/Identifier";
import { User } from "../models/User";
import { UserRepository } from "../models/UserRepository";
import { FullName } from "../types/FullName";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserController {
  public async control(message: CreateUserMessage): Promise<Identifier> {
    const userRepository: UserRepository = new MongoUserRepository(
      container.resolve(MongoDBClient)
    );

    const user = await User.build(
      message.name,
      message.email,
      message.phoneNumber,
      message.password
    );

    return await userRepository.create(user);
  }
}
