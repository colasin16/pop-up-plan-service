import { Model } from "../../core/model/Model";
import { FullName } from "../../types/FullName";
import { PasswordEncryptor } from "../../utils/PasswordEcryptor";
import { Identifier } from "../../core/model/Identifier";
import { UserPrimitives } from "./UserPrimitives";


export class UserModel extends Model {
  private id: Identifier;
  private name: FullName;
  private email: string;
  private phoneNumber: string;
  private password: string;

  public static deserialize(document: UserPrimitives): Promise<UserModel> {
    return this.buildWithIdentifier(
      Identifier.fromString(document.id),
      document.name,
      document.email,
      document.phoneNumber,
      document.password
    );
  }

  constructor(async_param) {
    super()
    if (typeof async_param === "undefined") {
      throw new Error("Cannot be called directly, use build method instead");
    }
  }

  static async build(
    name: FullName,
    email: string,
    phoneNumber: string,
    password: string
  ): Promise<UserModel> {
    const emailThis = email;
    const nameThis = name;
    const phoneNumberThis = phoneNumber;
    const encryptedPassword = await PasswordEncryptor.encryptPassword(password);

    const user = new UserModel(encryptedPassword);
    user.name = nameThis;
    user.email = emailThis;
    user.phoneNumber = phoneNumberThis;
    user.password = encryptedPassword;

    return user;
  }

  /**
   * We have id here, which means user is already created and we have a encrypted password
   * @param id
   * @param name
   * @param email
   * @param phoneNumber
   * @param encryptedPassword
   * @returns
   */
  static async buildWithIdentifier(
    id: Identifier,
    name: FullName,
    email: string,
    phoneNumber: string,
    encryptedPassword: string
  ): Promise<UserModel> {
    const emailThis = email;
    const nameThis = name;
    const phoneNumberThis = phoneNumber;
    // const encryptedPassword = await PasswordEncryptor.encryptPassword(password);

    const user = new UserModel(true);
    user.name = nameThis;
    user.email = emailThis;
    user.phoneNumber = phoneNumberThis;
    user.id = id;

    // TODO: change user.password to user.encryptedPassword
    user.password = encryptedPassword;

    return user;
  }

  public getId(): Identifier {
    return this.id;
  }

  public serialize(): UserPrimitives {
    return {
      id: this.id?.toString(),
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };
  }
}
