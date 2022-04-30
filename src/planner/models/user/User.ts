import { UserPrimitives } from "./UserPrimitives";
import { FullName } from "../../types/FullName";
import { Identifier } from "../Identifier";
import { Plan } from "../plan/Plan";

export class User {
  private id: Identifier;
  private name: FullName;
  private email: string;
  private phoneNumber: string;
  private password: string;

  public static fromPrimitives(document: UserPrimitives): User {
    const user = new User(
      document.name,
      document.email,
      document.phoneNumber,
      document.password
    );
    user.id = Identifier.fromString(document.id);
    return user;
  }

  constructor(
    name: FullName,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    this.id = new Identifier();
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  // static async build(
  //   name: FullName,
  //   email: string,
  //   phoneNumber: string,
  //   password: string,
  // ): Promise<User> {
  //   const userWithSameEmail = await new MongoUserRepository(
  //     container.resolve(MongoDBClient)
  //   ).findByEmail(email);

  //   if (userWithSameEmail) {
  //     throw new Error("User with that email already exists");
  //   }

  //   const emailThis = email;
  //   const nameThis = name;
  //   const phoneNumberThis = phoneNumber;
  //   const encryptedPassword = await PasswordEncryptor.encryptPassword(password);

  //   const user = new User(encryptedPassword);
  //   user.name = nameThis;
  //   user.email = emailThis;
  //   user.phoneNumber = phoneNumberThis;
  //   user.password = encryptedPassword;

  //   return user;
  // }

  // static async buildWithIdentifier(
  //   id: Identifier,
  //   name: FullName,
  //   email: string,
  //   phoneNumber: string,
  //   password: string
  // ): Promise<User> {
  //   const user = await this.build(name, email, phoneNumber, password);
  //   user.id = id;
  //   return user;
  // }

  public getId(): Identifier {
    return this.id;
  }

  public toPrimitives(): UserPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };
  }
}
