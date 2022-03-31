import { User } from "../models/User";
import { Identifier } from "../models/Identifier";
import { UserRepository } from "../models/UserRepository";

export interface CreateUserMessage {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export class CreateUserView {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public interact(message: CreateUserMessage): Identifier {
    const user = new User(
      message.name,
      message.lastName,
      message.email,
      message.phoneNumber,
      message.id
    );
    this.userRepository.create(user);
    return user.getId();
  }
}
