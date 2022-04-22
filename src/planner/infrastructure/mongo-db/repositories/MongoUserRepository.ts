import { Collection, ObjectId } from "mongodb";
import { autoInjectable } from "tsyringe";
import { Identifier } from "../../../models/Identifier";
import { User } from "../../../models/User";
import { UserRepository } from "../../../models/UserRepository";
import { MongoUserConverter } from "../converters/UserConverter";
import { MongoUser } from "../models/MongoUser";
import { MongoDBClient } from "../MongoDBClient";

@autoInjectable()
export class MongoUserRepository implements UserRepository {
  private collection: Collection<MongoUser>;

  constructor(mongoClient?: MongoDBClient) {
    this.collection = mongoClient!.client
      .db("FriendInCrime")
      .collection("Users");
  }

  public async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.collection.findOne({
      email,
    });

    return foundUser ? MongoUserConverter.mongoUserToUser(foundUser) : null;
  }

  public async find(id: Identifier): Promise<User | null> {
    const _id = new ObjectId(id.toString());
    const foundItem = await this.collection.findOne({ _id });

    return foundItem ? MongoUserConverter.mongoUserToUser(foundItem) : null;
  }

  update(user: User): void {
    throw new Error("Method not implemented.");
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<User | null> {
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

    const identifier = Identifier.fromString(result.insertedId.toString());
    const newUser = await this.find(identifier);

    return newUser;
  }
}
