import { Controller } from "../../core/Controller";
import { AlreadyExistsError } from "../../core/ResponseErrors";
import { ResponseData } from "../../core/types";
import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserModel } from "../../models/User";
import { UserRepository } from "../../models/UserRepository";
import { FullName } from "../../types/FullName";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserController extends Controller<CreateUserMessage> {
  protected async doControl(message: CreateUserMessage): Promise<ResponseData> {
    const userRepository: UserRepository = new MongoUserRepository();

    const user = await UserModel.build(
      message.name,
      message.email,
      message.phoneNumber,
      message.password
    );

    const createUser = await userRepository.create(user);
    const data = createUser ? createUser.serialize() : null;

    return { data: data, success: true, errors: [] };
  }

  protected async validate(message): Promise<void> {
    const userWithSameEmail = await new MongoUserRepository().findByEmail(
      message.email
    );

    if (userWithSameEmail) {
      throw new AlreadyExistsError();
    }

  }
}
