import { autoInjectable } from "tsyringe";
import { Collection } from "mongodb";
import { ObjectID } from "bson";

import { UserPrimitives } from "../../../models/primitives/UserPrimitives";
import { MongoUserConverter } from "../converters/UserConverter";
import { UserRepository } from "../../../models/UserRepository";
import { Identifier } from "../../../models/Identifier";
import { MongoDBClient } from "../MongoDBClient";
import { MongoUser } from "../models/MongoUser";
import { User } from "../../../models/User";

@autoInjectable()
export class MongoUserRepository implements UserRepository {
  private collection: Collection<MongoUser>;

  constructor(mongoClient?: MongoDBClient) {
    this.collection = mongoClient!.client
      .db("FriendInCrime")
      .collection("Users");
  }

  public async findByEmail(email: string): Promise<UserPrimitives | null> {
    const foundPlan = await this.collection.findOne({
      email,
    });

    return foundPlan
      ? MongoUserConverter.mongoUserToUserPrimitives(foundPlan)
      : null;
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

  public async create(user: User): Promise<Identifier> {
    const serializedUser = user.serialize();
    const result = await this.collection.insertOne({
      name: {
        firstName: serializedUser.name.firstName,
        lastName: serializedUser.name.lastName,
      },
      email: serializedUser.email,
      phoneNumber: serializedUser.phoneNumber,
      password: serializedUser.password,
    });
    console.log("User created with id " + result.insertedId);
    return new Identifier(new ObjectID(result.insertedId.toString()));
  }
}
