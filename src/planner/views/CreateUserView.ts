import { User } from "../models/User";
import { Identifier } from "../models/Identifier";
import { UserRepository } from "../models/UserRepository";
import { ObjectId } from "bson";

export interface CreateUserMessage {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserView {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async interact(message: CreateUserMessage): Promise<Identifier> {
    const user = await User.build(
      new Identifier(new ObjectId(message.id)),
      message.name,
      message.lastName,
      message.email,
      message.phoneNumber,
      message.password
    );
    this.userRepository.create(user);
    return user.getId();
  }
}
