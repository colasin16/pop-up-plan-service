import { Controller, ControllerReturnMessage } from "../core/Controller";
import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { Identifier } from "../models/Identifier";
import { UserPrimitives } from "../models/primitives/UserPrimitives";
import { UserRepository } from "../models/UserRepository";

export interface GetUserMessage {
  id: Identifier;
}

export class GetUserResponse extends ControllerReturnMessage {
  data: UserPrimitives | null;
}
export class GetUserController extends Controller {
  protected async doControl(message: GetUserMessage): Promise<GetUserResponse> {
    const userRepository: UserRepository = new MongoUserRepository();
    const user = await userRepository.find(message.id);

    return user ? { data: user.serialize() } : { data: null };
  }
}
