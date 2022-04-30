import { Collection, ObjectId } from "mongodb";
import { autoInjectable } from "tsyringe";

import { MongoUserConverter } from "../converters/UserConverter";
import { UserRepository } from "../../../models/user/UserRepository";
import { Identifier } from "../../../models/Identifier";
import { MongoDBClient } from "../MongoDBClient";
import { MongoUser } from "../models/MongoUser";
import { User } from "../../../models/user/User";
import { PasswordEncryptor } from "../../../utils/PasswordEcryptor";

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

    return foundUser ? MongoUserConverter.toDomain(foundUser) : null;
  }

  public async find(id: Identifier): Promise<User | null> {
    const _id = new ObjectId(id.toString());
    const foundItem = await this.collection.findOne({ _id });

    return foundItem ? MongoUserConverter.toDomain(foundItem) : null;
  }

  update(user: User): void {
    throw new Error("Method not implemented.");
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<User | null> {
    const userPrimitives = user.toPrimitives();
    const userWithSameEmail = await this.findByEmail(userPrimitives.email);

    if (userWithSameEmail) {
      // checks if email exists
      // if email exists return null
      // else return user domain entity

      // class NullObject {}
      //

      // this smell should be solved with nullobject pattern
      throw new Error("User with that email already exists");
    }

    const encryptedPassword = await PasswordEncryptor.encryptPassword(
      userPrimitives.password
    );

    const result = await this.collection.insertOne({
      _id: new ObjectId(userPrimitives.id),
      name: {
        firstName: userPrimitives.name.firstName,
        lastName: userPrimitives.name.lastName,
      },
      email: userPrimitives.email,
      phoneNumber: userPrimitives.phoneNumber,
      password: encryptedPassword,
    });

    console.log("User created with id " + result.insertedId);

    const identifier = Identifier.fromString(result.insertedId.toString());

    const newUser = await this.find(identifier);

    return newUser;
  }
}
