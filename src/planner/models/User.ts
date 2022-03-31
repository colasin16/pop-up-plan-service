import { ObjectId } from "bson";
import { UserDocument } from "./documents/UserDocument";
import { Identifier } from "./Identifier";

export class User {
  private id: Identifier;
  private name: string;
  private lastName: string;
  private email: string;
  private phoneNumber: string;

  public static deserialize(document: UserDocument) {
    return new User(
      document.name,
      document.lastName,
      document.email,
      document.phoneNumber,
      document.id
    );
  }

  constructor(
    name?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    id?: string
  ) {
    this.name = name ?? "";
    this.lastName = lastName ?? "";
    this.email = email ?? "";
    this.phoneNumber = phoneNumber ?? "";
    this.id = id ? new Identifier(new ObjectId(id)) : new Identifier();
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
    };
  }
}
