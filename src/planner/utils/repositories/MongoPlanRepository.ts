import { Collection } from "mongodb";
import { MongoDBClient } from "../../apps/PlannerMongo";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/Plan";
import { PlanRepository } from "../../models/PlanRepository";
import { Category } from "../../types/Category";

export class MongoPlanRepository implements PlanRepository {
  private collection: Collection;
  constructor(mongoClient: MongoDBClient) {
    this.collection = mongoClient.client
      .db("FriendInCrime")
      .collection("Plans");
  }

  find(id: Identifier): Plan | null {
    throw new Error("Method not implemented.");
  }

  findAll(): Plan[] {
    throw new Error("Method not implemented.");
  }

  findByCategory(category: Category): Plan[] {
    throw new Error("Method not implemented.");
  }

  update(plan: Plan): void {
    throw new Error("Method not implemented.");
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(plan: Plan): Promise<void> {
    await this.collection.insertOne(plan.serialize());
    console.log("Plan created!! ");
  }
}
