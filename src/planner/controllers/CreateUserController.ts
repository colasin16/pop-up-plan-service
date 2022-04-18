import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoUserRepository } from "../infrastructure/mongo-db/MongoUserRepository";
import { Identifier } from "../models/Identifier";
import { UserPrimitives } from "../models/primitives/UserPrimitives";
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
  public async control(
    message: CreateUserMessage
  ): Promise<UserPrimitives | null> {
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
