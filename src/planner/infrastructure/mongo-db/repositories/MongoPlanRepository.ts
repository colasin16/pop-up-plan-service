import { autoInjectable } from "tsyringe";
import { Collection, ObjectId } from "mongodb";
import { ObjectID } from "bson";

import { PlanPrimitives } from "../../../models/plan/PlanPrimitives";
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

  public async find(id: Identifier): Promise<PlanPrimitives | null> {
    const _id = new ObjectId(id.toString());
    const foundItem = await this.collection.findOne({ _id });

    console.debug(`foundedItem: ${foundItem}`);

    return foundItem
      ? MongoPlanConverter.mongoPlanToPlanPrimitives(foundItem)
      : null;
  }

  public async findAll(): Promise<PlanPrimitives[]> {
    const mongoPlanList = await this.collection.find().toArray();

    return mongoPlanList.map<PlanPrimitives>((planDocument) =>
      MongoPlanConverter.mongoPlanToPlanPrimitives(planDocument)
    );
  }

  public async findByCategory(category: Category): Promise<PlanPrimitives[]> {
    const plans = new Array<PlanPrimitives>();
    const plansPrimitives = await this.findAll();

    plansPrimitives.forEach((plan) => {
      const planInstance = Plan.deserialize(plan);
      if (planInstance.hasCategory(category)) {
        plans.push(plan);
      }
    });

    return plans;
  }

  update(plan: Plan): void {
    throw new Error("Method not implemented.");
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(plan: Plan): Promise<PlanPrimitives | null> {
    const result = await this.collection.insertOne(
      MongoPlanConverter.planToMongoPlan(plan)
    );

    const identifier = new Identifier(
      new ObjectID(result.insertedId.toString())
    );

    const createdItem = await this.find(identifier);

    return createdItem;
  }
}
