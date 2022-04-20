import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserPrimitives } from "../models/primitives/UserPrimitives";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";
import { UserRepository } from "../models/UserRepository";

export interface LoginMessage {
  username: string;
  password: string;
}

export interface LoginResponseMessage {
  token: string;

  // TODO: Revise this part
  // temprorarily we return user completely when user authenticates,
  // to have user data in front-end for profile screen
  user: UserPrimitives;
}

export class LoginController {
  public async control(
    message: LoginMessage
  ): Promise<LoginResponseMessage | undefined> {
    const userRepository: UserRepository = new MongoUserRepository();

    const userPrimitives = await userRepository.findByEmail(message.username);
    console.debug(`userPrimitives: ${JSON.stringify(userPrimitives)}`);

    if (userPrimitives) {
      const plainPassword = message.password;
      console.log(`plainPassword: ${plainPassword}`);
      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        userPrimitives.password
      );

      if (loggedIn) {
        console.debug(`user: ${message.username}, Logged in successfully`);
        // TODO: implement token part
        return { token: "fakeToken", user: userPrimitives };
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
