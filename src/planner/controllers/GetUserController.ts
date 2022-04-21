import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { Identifier } from "../models/Identifier";
import { UserPrimitives } from "../models/primitives/UserPrimitives";
import { UserRepository } from "../models/UserRepository";
import { ControllerReturnMessage } from "./types";

export interface GetUserMessage {
  id: Identifier;
}

export class GetUserResponse extends ControllerReturnMessage {
  data: UserPrimitives | null;
}
export class GetUserController {
  public async control(message: GetUserMessage): Promise<GetUserResponse> {
    const userRepository: UserRepository = new MongoUserRepository();
    const user = await userRepository.find(message.id);

    return user ? { data: user } : { data: null };
  }
}
