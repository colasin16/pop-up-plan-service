import { container } from "tsyringe";
import { ObjectId } from "bson";

import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { MongoDBClient } from "../../infrastructure/mongo-db/MongoDBClient";
import { PasswordEncryptor } from "../../utils/PasswordEcryptor";
import { UserPrimitives } from "./UserPrimitives";
import { FullName } from "../../types/FullName";
import { Identifier } from "../Identifier";

export class User {
  private id: Identifier;
  private name: FullName;
  private email: string;
  private phoneNumber: string;
  private password: string;

  public static fromPrimitives(document: UserPrimitives): Promise<User> {
    return this.buildWithIdentifier(
      new Identifier(new ObjectId(document.id)),
      document.name,
      document.email,
      document.phoneNumber,
      document.password
    );
  }

  constructor(async_param) {
    if (typeof async_param === "undefined") {
      throw new Error("Cannot be called directly, use build method instead");
    }
  }

  static async build(
    name: FullName,
    email: string,
    phoneNumber: string,
    password: string
  ): Promise<User> {
    const userWithSameEmail = await new MongoUserRepository(
      container.resolve(MongoDBClient)
    ).findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("User with that email already exists");
    }

    const emailThis = email;
    const nameThis = name;
    const phoneNumberThis = phoneNumber;
    const encryptedPassword = await PasswordEncryptor.encryptPassword(password);

    const user = new User(encryptedPassword);
    user.name = nameThis;
    user.email = emailThis;
    user.phoneNumber = phoneNumberThis;
    user.password = encryptedPassword;

    return user;
  }

  static async buildWithIdentifier(
    id: Identifier,
    name: FullName,
    email: string,
    phoneNumber: string,
    password: string
  ): Promise<User> {
    const user = await this.build(name, email, phoneNumber, password);
    user.id = id;
    return user;
  }

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
