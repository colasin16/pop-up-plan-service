import { Collection, ObjectId } from "mongodb";
import { autoInjectable } from "tsyringe";
import { Identifier } from "../../../core/model/Identifier";
import { UserModel } from "../../../models/user-model/UserModel";
import { UserRepository } from "../../../models/user-model/UserRepository";
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

  public async findByEmail(email: string): Promise<UserModel | null> {
    const foundUser = await this.collection.findOne({
      email,
    });

    return foundUser ? MongoUserConverter.mongoUserToUser(foundUser) : null;
  }

  public async find(id: Identifier): Promise<UserModel | null> {
    const _id = new ObjectId(id.toString());
    const foundItem = await this.collection.findOne({ _id });

    return foundItem ? MongoUserConverter.mongoUserToUser(foundItem) : null;
  }

  public async findAll(): Promise<UserModel[]> {
    throw new Error("Method not implemented.");

  }

  public async update(user: UserModel): Promise<UserModel | null> {
    throw new Error("Method not implemented.");
  }

  public async findMultipleObjectsById(ids: Identifier[]): Promise<UserModel[]> {
    const oids: ObjectId[] = [];
    ids.forEach(function (item) {
      oids.push(new ObjectId(item.toString()));
    });

    const mongoUserList = await this.collection.find({ _id: { $in: oids } }).toArray()
    const mongoUserListPromises = mongoUserList.map<Promise<UserModel>>((userDocument) =>
      MongoUserConverter.mongoUserToUser(userDocument)
    );

    return Promise.all(mongoUserListPromises)
  }


  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(user: UserModel): Promise<UserModel | null> {
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
