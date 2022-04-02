import { ObjectId } from "bson";
import { userInfo } from "os";
import { PasswordEncryptor } from "../utils/PasswordEcryptor";
import { UserDocument } from "./documents/UserDocument";
import { Identifier } from "./Identifier";

export class User {
  private id: Identifier;
  private name: string;
  private lastName: string;
  private email: string;
  private phoneNumber: string;
  private password: string;

  public static deserialize(document: UserDocument): Promise<User> {
    return this.build(
      document.name,
      document.lastName,
      document.email,
      document.phoneNumber,
      document.password,
      document.id
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
    name?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    password?: string,
    id?: string
  ): Promise<User> {
    const nameThis = name ?? "";
    const lastNameThis = lastName ?? "";
    const emailThis = email ?? "";
    const phoneNumberThis = phoneNumber ?? "";
    const encryptedPassword = await PasswordEncryptor.encryptPassword(password);

    const passwordThis = password ? encryptedPassword : "";
    const idThis = id ? new Identifier(new ObjectId(id)) : new Identifier();

    // var async_result = await doSomeAsyncStuff();
    let tmpUser = new User(encryptedPassword);
    tmpUser.name = nameThis;
    tmpUser.lastName = lastNameThis;
    tmpUser.email = emailThis;
    tmpUser.phoneNumber = phoneNumberThis;
    tmpUser.password = passwordThis;
    tmpUser.id = idThis;

    return tmpUser;
  }

  public getId() {
    return this.id;
  }

  public serialize(): UserDocument {
    return {
      id: this.id.toString(),
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };
  }
}
