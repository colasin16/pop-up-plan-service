import { UserRepository } from "../models/UserRepository";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";

export interface loginUserMessage {
  username: string;
  password: string;
}

export class LoginUserView {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async interact(message: loginUserMessage): Promise<String | null> {
    const user = await this.userRepository.findByEmail(message.username);

    if (user) {
      const hashPassword = user.serialize().password;
      const plainPassword = message.password;
      const loggedIn = await PasswordEncryptor.comparePassword(
        plainPassword,
        hashPassword
      );

      if (loggedIn) {
        console.log(`user: ${message.username}, Logged in successfully`);
        // TODO: implement token part
        return "fakeToken";
      } else {
        console.log(`user:${message.username}, Login failed`);
      }
    }
    return null;
  }
}