import { ObjectId } from "bson";
import { UserDocument } from "./documents/UserDocument";
import { Identifier } from "./Identifier";

export class User {
  private id: Identifier;

  public static deserialize(document: UserDocument) {
    return new User(document.id);
  }

  constructor(id?: string) {
    this.id = id ? new Identifier(new ObjectId(id)) : new Identifier();
  }

  public getId() {
    return this.id;
  }

  public serialize(): any {
    return {
      id: this.id.toString(),
    };
  }
}
