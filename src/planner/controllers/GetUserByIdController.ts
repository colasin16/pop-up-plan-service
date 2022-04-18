import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoUserRepository } from "../infrastructure/mongo-db/MongoUserRepository";
import { Identifier } from "../models/Identifier";
import { User } from "../models/User";
import { UserRepository } from "../models/UserRepository";

export interface FindUserMessage {
  id: Identifier;
}

export class GetUserByIdController {
  public async control(message: FindUserMessage): Promise<User | null> {
    const userRepository: UserRepository = new MongoUserRepository(
      container.resolve(MongoDBClient)
    );
    const userPrimitive = await userRepository.find(message.id);

    return userPrimitive ? User.deserialize(userPrimitive) : null;
  }
}
