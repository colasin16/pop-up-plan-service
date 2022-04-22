import { Controller } from "../../core/Controller";
import { ForbiddenError } from "../../core/ResponseErrors";
import { ResponseData } from "../../core/types";
import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserRepository } from "../../models/UserRepository";
import { PasswordEncryptor } from "../../utils/PasswordEcryptor";

export interface LoginMessage {
  username: string;
  password: string;
}

// export interface LoginResponseMessage extends ResponseData {
//   data: {
//     token: string;

//     // TODO: Revise this part
//     // temprorarily we return user completely when user authenticates,
//     // to have user data in front-end for profile screen
//     user: UserPrimitives;
//   };
// }

export class LoginController extends Controller {
  protected async doControl(message: LoginMessage): Promise<ResponseData> {
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

        const data = {
          token: "fakeToken__ReplaceWithJWTLater", //TODO:  Replace with JWT later
          user: user.serialize(),
        };

        return {
          data: data,
          success: false,
          errors: [],
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
