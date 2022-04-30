import { autoInjectable, container } from "tsyringe";
import { Collection } from "mongodb";

import { MongoPlanConverter } from "../converters/PlanConverter";
import { PlanRepository } from "../../../models/plan/PlanRepository";
import { Identifier } from "../../../models/Identifier";
import { Category } from "../../../types/Category";
import { MongoDBClient } from "../MongoDBClient";
import { MongoPlan } from "../models/MongoPlan";
import { Plan } from "../../../models/plan/Plan";

@autoInjectable()
export class MongoPlanRepository implements PlanRepository {
  private collection: Collection<MongoPlan>;

  constructor(mongoDBClient?: MongoDBClient) {
    this.collection = mongoDBClient!.client
      .db("FriendInCrime")
      .collection<MongoPlan>("Plans");
  }

  public async find(id: Identifier): Promise<Plan | null> {
    const mongoPlan = await this.collection.findOne({ _id: id });
    return mongoPlan ? MongoPlanConverter.toDomain(mongoPlan) : null;
  }

  public async findAll(): Promise<Plan[]> {
    const mongoPlanList = await this.collection.find().toArray();

    return mongoPlanList.length > 0
      ? MongoPlanConverter.manyToDomain(mongoPlanList)
      : [];
  }

  findByCategory(category: Category): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }

  update(plan: Plan): void {
    throw new Error("Method not implemented.");
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(plan: Plan): Promise<Plan | null> {
    await this.collection.insertOne(MongoPlanConverter.toMongo(plan));

    return null;
  }
}
