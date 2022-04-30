import { Collection, ObjectId } from "mongodb";
import { autoInjectable } from "tsyringe";
import { ObjectID } from "bson";

import { UserPrimitives } from "../../../models/user/UserPrimitives";
import { MongoUserConverter } from "../converters/UserConverter";
import { UserRepository } from "../../../models/user/UserRepository";
import { Identifier } from "../../../models/Identifier";
import { MongoDBClient } from "../MongoDBClient";
import { MongoUser } from "../models/MongoUser";
import { User } from "../../../models/user/User";

@autoInjectable()
export class MongoUserRepository implements UserRepository {
  private collection: Collection<MongoUser>;

  constructor(mongoClient?: MongoDBClient) {
    this.collection = mongoClient!.client
      .db("FriendInCrime")
      .collection("Users");
  }

  public async findByEmail(email: string): Promise<UserPrimitives | null> {
    const foundUser = await this.collection.findOne({
      email,
    });

    return foundUser
      ? MongoUserConverter.mongoUserToUserPrimitives(foundUser)
      : null;
  }

  public async find(id: Identifier): Promise<UserPrimitives | null> {
    const _id = new ObjectId(id.toString());
    const foundItem = await this.collection.findOne({ _id });

    return foundItem
      ? MongoUserConverter.mongoUserToUserPrimitives(foundItem)
      : null;
  }

  update(user: User): void {
    throw new Error("Method not implemented.");
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<UserPrimitives | null> {
    const serializedUser = user.toPrimitives();
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

    const identifier = new Identifier(
      new ObjectID(result.insertedId.toString())
    );

    const newUser = await this.find(identifier);

    return newUser;
  }
}
