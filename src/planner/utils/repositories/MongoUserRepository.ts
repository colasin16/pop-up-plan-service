import { ObjectId } from "bson";
import { Collection, WithId } from "mongodb";
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
  public async findByEmail(email: string): Promise<User | null> {
    const foundPlan = await this.collection.findOne({
      email,
    });

    if (!foundPlan) {
      return null;
    }

    // console.debug(`typeof foundPlan: ${typeof foundPlan}`);
    console.debug(`found plan: ${JSON.stringify(foundPlan)}`);
    console.debug(`found plan id: ${JSON.stringify(foundPlan.id)}`);
    const userDocument = foundPlan;
    const hashPassword = userDocument.password; //password which is saved on db is hashed password

    const user = User.build(
      new Identifier(new ObjectId(userDocument.id._value)),
      userDocument.name,
      userDocument.lastName,
      userDocument.email,
      userDocument.phoneNumber,
      "",
      hashPassword
    );
    return user;
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
    await this.collection.insertOne(user);
    console.log("User created!! ");
  }
}
