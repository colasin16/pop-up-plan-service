import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserPrimitives } from "../models/primitives/UserPrimitives";
import { UserRepository } from "../models/UserRepository";
import { FullName } from "../types/FullName";
import { User } from "../models/User";
import { container } from "tsyringe";
import { MongoDBClient } from "../infrastructure/mongo-db/MongoDBClient";
import { AlreadyExistsError } from "../core/ResponseErrors";
import { Controller } from "../core/Controller";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserController extends Controller {
  protected async doControl(
    message: CreateUserMessage
  ): Promise<UserPrimitives | null> {
    const userRepository: UserRepository = new MongoUserRepository();

    const user = await User.build(
      message.name,
      message.email,
      message.phoneNumber,
      message.password
    );

    const createUser = await userRepository.create(user);
    return createUser ? createUser.serialize() : null;
  }

  protected async validate(message): Promise<void> {
    const userWithSameEmail = await new MongoUserRepository(
      container.resolve(MongoDBClient)
    ).findByEmail(message.email);

    if (userWithSameEmail) {
      throw new AlreadyExistsError();
    }
  }
}
