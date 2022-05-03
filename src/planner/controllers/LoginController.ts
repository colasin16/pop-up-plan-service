import jwt from "jsonwebtoken"
import { MongoUserRepository } from "../infrastructure/mongo-db/repositories/MongoUserRepository";
import { UserPrimitives } from "../models/user/UserPrimitives";
import { UserRepository } from "../models/user/UserRepository";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";


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
      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        user.toPrimitives().password
      );

      if (loggedIn) {
        console.debug(`user: ${message.username}, Logged in successfully`);
        const authorizationToken: string = this.generateAuthorizationToken(message)
        return { token: authorizationToken, user: user.toPrimitives() };
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

  /**
   * Generates authorization token
   * reference: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
   * @param message 
   * @returns 
   */
  private generateAuthorizationToken(message: LoginMessage): string {
    const tokenSecret: string | undefined = process.env.TOKEN_SECRET
    console.log('tokenSecret:', tokenSecret)
    if (tokenSecret === undefined) {
      throw Error("'TOKEN_SECRET' environment variable must be set")
    }

    const tokenExpiresIn: string | undefined = process.env.TOKEN_EXPIRARES_IN
    if (tokenExpiresIn === undefined) {
      throw Error("'TOKEN_EXPIRARES_IN' environment variable must be set")
    }

    const payload = {
      username: message.username,
      // TODO: add role
      //role: message.role,
    }

    const signOptions = {
      //expiresIn e.g.: 2h, 1800s, ...
      expiresIn: tokenExpiresIn,

    }

    const accessToken = jwt.sign(payload, tokenSecret, signOptions)

    return accessToken
  }
}
