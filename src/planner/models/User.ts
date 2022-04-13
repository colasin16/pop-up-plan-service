import { ObjectId } from "bson";
import { FullName } from "../types/FullName";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";
import { UserPrimitives } from "./primitives/UserPrimitives";
import { Identifier } from "./Identifier";

export class User {
  private id: Identifier;
  private name: FullName;
  private email: string;
  private phoneNumber: string;
  private password: string;

  public static deserialize(document: UserPrimitives): Promise<User> {
    return this.build(
      new Identifier(new ObjectId(document.id)),
      document.name,
      document.email,
      document.phoneNumber,
      document.password
    );
  }

  // constructor(
  //   name?: string,
  //   lastName?: string,
  //   email?: string,
  //   phoneNumber?: string,
  //   password?: string,
  //   id?: string
  // ) {
  //   this.name = name ?? "";
  //   this.lastName = lastName ?? "";
  //   this.email = email ?? "";
  //   this.phoneNumber = phoneNumber ?? "";
  //   this.password = password ? await PasswordEncryptor(password) : "";
  //   this.id = id ? new Identifier(new ObjectId(id)) : new Identifier();
  // }

  constructor(async_param) {
    if (typeof async_param === "undefined") {
      throw new Error("Cannot be called directly, use build method instead");
    }
  }

  static async build(
    id: Identifier,
    name: FullName,
    email: string,
    phoneNumber: string,
    password: string
  ): Promise<User> {
    const nameThis = name;
    const emailThis = email;
    const phoneNumberThis = phoneNumber;
    const encryptedPassword = await PasswordEncryptor.encryptPassword(password);

    // Here we should check that the email is not duplicated / or the phone number
    // var async_result = await doSomeAsyncStuff();
    let tmpUser = new User(encryptedPassword);
    tmpUser.name = nameThis;
    tmpUser.email = emailThis;
    tmpUser.phoneNumber = phoneNumberThis;
    tmpUser.password = encryptedPassword;
    tmpUser.id = id;

    return tmpUser;
  }

  public getId() {
    return this.id;
  }

  public serialize(): UserPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };
  }
}
