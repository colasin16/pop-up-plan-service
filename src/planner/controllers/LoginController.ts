import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserPrimitives } from "../models/user/UserPrimitives";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";
import { UserRepository } from "../models/user/UserRepository";

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
  ): Promise<LoginResponseMessage | null> {
    const userRepository: UserRepository = new MongoUserRepository();

    const user = await userRepository.findByEmail(message.username);

    if (user) {
      const plainPassword = message.password;
      console.log(`plainPassword: ${plainPassword}`);
      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        user.toPrimitives().password
      );

      if (loggedIn) {
        console.debug(`user: ${message.username}, Logged in successfully`);
        // TODO: implement token part
        return { token: "fakeToken", user: user.toPrimitives() };
      } else {
        console.debug(`user:${message.username}, Login failed`);
        return null;
      }
    }
    console.debug(
      `cannot authenticate because user '${message.username}' has not been found`
    );

    return null;
  }
}
