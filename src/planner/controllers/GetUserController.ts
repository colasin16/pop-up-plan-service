import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserRepository } from "../models/UserRepository";
import { Identifier } from "../models/Identifier";
import { User } from "../models/User";

export interface GetUserMessage {
  id: Identifier;
}

export class GetUserController {
  public async control(message: GetUserMessage): Promise<User | null> {
    const userRepository: UserRepository = new MongoUserRepository();
    const userPrimitive = await userRepository.find(message.id);

    return userPrimitive ? User.deserialize(userPrimitive) : null;
  }
}
