import { container } from "tsyringe";
import { MongoDBClient } from "../infrastructure/mongo-db/MongoDBClient";
import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserRepository } from "../models/UserRepository";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";

export interface LoginMessage {
  username: string;
  password: string;
}

export class LoginController {
  public async control(message: LoginMessage): Promise<String | void> {
    const userRepository: UserRepository = new MongoUserRepository(
      container.resolve(MongoDBClient)
    );

    const userPrimitives = await userRepository.findByEmail(message.username);

    if (userPrimitives) {
      const plainPassword = message.password;
      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        userPrimitives.password
      );

      if (loggedIn) {
        console.debug(`user: ${message.username}, Logged in successfully`);
        // TODO: implement token part
        return "fakeToken";
      } else {
        console.debug(`user:${message.username}, Login failed`);
        return;
      }
    }
    console.debug(
      `cannot authenticate because user '${message.username}' has not been found`
    );
  }
}
