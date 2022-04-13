import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoUserRepository } from "../infrastructure/mongo-db/MongoUserRepository";
import { UserRepository } from "../models/UserRepository";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";

export interface LoginMessage {
  username: string;
  password: string;
}

export class LoginController {
  public async control(message: LoginMessage): Promise<String | null> {
    const userRepository: UserRepository = new MongoUserRepository(
      container.resolve(MongoDBClient)
    );

    const user = await userRepository.findByEmail(message.username);

    if (user) {
      const hashPassword = user.serialize().password;
      const plainPassword = message.password;
      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        hashPassword
      );

      if (loggedIn) {
        console.debug(`user: ${message.username}, Logged in successfully`);
        // TODO: implement token part
        return "fakeToken";
      } else {
        console.debug(`user:${message.username}, Login failed`);
      }
    }
    console.debug(
      `cannot authenticate because user '${message.username}' has not been found`
    );
    return null;
  }
}
