import { Controller } from "../../core/Controller";
import { ResponseData } from "../../core/types";
import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { Identifier } from "../../core/model/Identifier";
import { UserRepository } from "../../models/user-model/UserRepository";

export interface GetUserMessage {
  id: Identifier;
}

export class GetUserController extends Controller<GetUserMessage> {
  protected async doControl(message: GetUserMessage): Promise<ResponseData> {
    const userRepository: UserRepository = new MongoUserRepository();
    const user = await userRepository.find(message.id);
    const data = user ? user.serialize() : null;
    return { data, success: true, errors: [] };
  }
}
