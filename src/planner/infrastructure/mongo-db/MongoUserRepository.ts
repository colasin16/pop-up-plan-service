import { ObjectID } from "bson";
import { Collection } from "mongodb";
import { MongoDBClient } from "../../apps/PlannerMongo";
import { Identifier } from "../../models/Identifier";
import { UserPrimitives } from "../../models/primitives/UserPrimitives";
import { User } from "../../models/User";
import { UserRepository } from "../../models/UserRepository";
import { MongoUserConverter } from "./converters/UserConverter";
import { MongoUser } from "./models/MongoUser";

export class MongoUserRepository implements UserRepository {
  private collection: Collection<MongoUser>;

  constructor(mongoClient: MongoDBClient) {
    this.collection = mongoClient.client
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
