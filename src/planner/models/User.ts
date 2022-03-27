import { ObjectId } from "bson";
import { UserDocument } from "./documents/UserDocument";
import { Identifier } from "./Identifier";

export class User {
  private id: Identifier;
  private name: string;

  public static deserialize(document: UserDocument) {
    return new User(document.name, document.id);
  }

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ? new Identifier(new ObjectId(id)) : new Identifier();
  }

  public getId() {
    return this.id;
  }

  public serialize(): UserDocument {
    return {
      id: this.id.toString(),
      name: this.name,
    };
  }
}
