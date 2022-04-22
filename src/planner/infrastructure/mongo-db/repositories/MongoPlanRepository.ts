import { autoInjectable } from "tsyringe";
import { Collection, ObjectId } from "mongodb";
import { ObjectID } from "bson";

import { PlanPrimitives } from "../../../models/primitives/PlanPrimitives";
import { MongoPlanConverter } from "../converters/PlanConverter";
import { PlanRepository } from "../../../models/PlanRepository";
import { Identifier } from "../../../models/Identifier";
import { Category } from "../../../types/Category";
import { MongoDBClient } from "../MongoDBClient";
import { MongoPlan } from "../models/MongoPlan";
import { Plan } from "../../../models/Plan";

@autoInjectable()
export class MongoPlanRepository implements PlanRepository {
  private collection: Collection<MongoPlan>;

  constructor(mongoDBClient?: MongoDBClient) {
    this.collection = mongoDBClient!.client
      .db("FriendInCrime")
      .collection<MongoPlan>("Plans");
  }

  public async find(id: Identifier): Promise<Plan | null> {
    const _id = new ObjectId(id.toString());
    const foundItem = await this.collection.findOne({ _id });

    return foundItem ? MongoPlanConverter.mongoPlanToPlan(foundItem) : null;
  }

  public async findAll(): Promise<Plan[]> {
    const mongoPlanList = await this.collection.find().toArray();

    return mongoPlanList.map<Plan>((planDocument) =>
      MongoPlanConverter.mongoPlanToPlan(planDocument)
    );
  }

  public async findByCategory(category: Category): Promise<Plan[]> {
    const plans = new Array<Plan>();
    const plansPrimitives = await this.findAll();

    plansPrimitives.forEach((plan) => {
      if (plan.hasCategory(category)) {
        plans.push(plan);
      }
    });

    return plans;
  }

  public async update(plan: Plan): Promise<Plan | null> {
    const updatedItem = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(plan.getId().toString()) },
      { $set: MongoPlanConverter.planToMongoPlan(plan) }
    );

    if (!updatedItem.value) {
      return null;
    }

    return MongoPlanConverter.mongoPlanToPlan(updatedItem.value);
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(plan: Plan): Promise<Plan | null> {
    const result = await this.collection.insertOne(
      MongoPlanConverter.planToMongoPlan(plan)
    );

    const identifier = Identifier.fromString(result.insertedId.toString());

    const createdItem = await this.find(identifier);

    return createdItem;
  }
}
