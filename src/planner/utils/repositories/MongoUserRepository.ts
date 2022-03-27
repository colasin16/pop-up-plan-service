import { Collection } from "mongodb";
import { MongoDBClient } from "../../apps/PlannerMongo";
import { Identifier } from "../../models/Identifier";
import { User } from "../../models/User";
import { UserRepository } from "../../models/UserRepository";

export class MongoUserRepository implements UserRepository {
  private collection: Collection;
  constructor(mongoClient: MongoDBClient) {
    this.collection = mongoClient.client
      .db("FriendInCrime")
      .collection("Users");
  }

  find(id: Identifier): User | null {
    throw new Error("Method not implemented.");
  }
  update(user: User): void {
    throw new Error("Method not implemented.");
  }
  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<void> {
    await this.collection.insertOne(user.serialize());
    console.log("User created!! ");
  }
}
