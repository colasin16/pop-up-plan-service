import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";
import { UserRepository } from "../models/UserRepository";

export interface LoginMessage {
  username: string;
  password: string;
}

export class LoginController {
  public async control(message: LoginMessage): Promise<String | void> {
    const userRepository: UserRepository = new MongoUserRepository();

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
