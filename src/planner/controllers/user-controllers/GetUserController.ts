import { Controller } from "../../core/Controller";
import { ResponseData } from "../../core/types";
import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { Identifier } from "../../models/Identifier";
import { UserRepository } from "../../models/UserRepository";

export interface GetUserMessage {
  id: Identifier;
}

export class GetUserController extends Controller {
  protected async doControl(message: GetUserMessage): Promise<ResponseData> {
    const userRepository: UserRepository = new MongoUserRepository();
    const user = await userRepository.find(message.id);
    const data = user ? user.serialize() : null;
    return { data, success: true, errors: [] };
  }
}
