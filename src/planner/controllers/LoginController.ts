import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserPrimitives } from "../models/primitives/UserPrimitives";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";
import { UserRepository } from "../models/UserRepository";
import { Controller, ControllerReturnMessage } from "../core/Controller";
import { ForbiddenError } from "../core/ResponseErrors";

export interface LoginMessage {
  username: string;
  password: string;
}

export interface LoginResponseMessage extends ControllerReturnMessage {
  data: {
    token: string;

    // TODO: Revise this part
    // temprorarily we return user completely when user authenticates,
    // to have user data in front-end for profile screen
    user: UserPrimitives;
  };
}

export class LoginController extends Controller {
  protected async doControl(
    message: LoginMessage
  ): Promise<ControllerReturnMessage> {
    const userRepository: UserRepository = new MongoUserRepository();

    const user = await userRepository.findByEmail(message.username);

    if (user) {
      const plainPassword = message.password;
      const hashedPassword = user.serialize().password;

      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        hashedPassword
      );

      if (loggedIn) {
        console.debug(`user: ${message.username}, Logged in successfully`);
        // TODO: implement token part

        return {
          data: {
            token: "fakeToken",
            user: user.serialize(),
          },
        };
      } else {
        console.debug(`user:${message.username}, Login failed`);
        throw new ForbiddenError();
      }
    }
    console.debug(
      `cannot authenticate because user '${message.username}' has not been found`
    );
    throw new ForbiddenError();
  }
}
