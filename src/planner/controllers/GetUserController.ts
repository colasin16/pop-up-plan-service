import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoUserRepository } from "../infrastructure/mongo-db/MongoUserRepository";
import { Identifier } from "../models/Identifier";
import { User } from "../models/User";
import { UserRepository } from "../models/UserRepository";

export interface GetUserMessage {
  id: Identifier;
}

export class GetUserController {
  public async control(message: GetUserMessage): Promise<User | null> {
    const userRepository: UserRepository = new MongoUserRepository(
      container.resolve(MongoDBClient)
    );
    const userPrimitive = await userRepository.find(message.id);

    return userPrimitive ? User.deserialize(userPrimitive) : null;
  }
}
