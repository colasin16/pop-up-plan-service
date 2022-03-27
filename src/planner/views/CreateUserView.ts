import { User } from "../models/User";
import { Identifier } from "../models/Identifier";
import { UserRepository } from "../models/UserRepository";

export interface CreateUserMessage {
  id?: string;
  name: string;
}

export class CreateUserView {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public interact(message: CreateUserMessage): Identifier {
    const user = new User(message.name, message.id);
    this.userRepository.create(user);
    return user.getId();
  }
}
