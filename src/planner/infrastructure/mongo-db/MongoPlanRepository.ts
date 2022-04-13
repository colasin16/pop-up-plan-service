import { Collection } from "mongodb";
import { MongoDBClient } from "../../apps/PlannerMongo";
import { PlanPrimitives } from "../../models/primitives/PlanPrimitives";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/Plan";
import { PlanRepository } from "../../models/PlanRepository";
import { Category } from "../../types/Category";
import { MongoPlan } from "./models/MongoPlan";
import { MongoPlanConverter } from "./converters/PlanConverter";

export class MongoPlanRepository implements PlanRepository {
  private collection: Collection<MongoPlan>;

  constructor(mongoClient: MongoDBClient) {
    this.collection = mongoClient.client
      .db("FriendInCrime")
      .collection<MongoPlan>("Plans");
  }

  public async find(id: Identifier): Promise<PlanPrimitives | null> {
    const foundPlan = await this.collection.findOne({
      id: id,
    });

    if (foundPlan) {
      return MongoPlanConverter.mongoPlanToPlanPrimitives(foundPlan);
    }

    return null;
  }

  public async findAll(): Promise<PlanPrimitives[]> {
    const mongoPlanList = await this.collection.find().toArray();

    const plansPrimitives = mongoPlanList.map<PlanPrimitives>((planDocument) =>
      MongoPlanConverter.mongoPlanToPlanPrimitives(planDocument)
    );

    return plansPrimitives;
  }

  public async findByCategory(category: Category): Promise<PlanPrimitives[]> {
    const plans = new Array<PlanPrimitives>();
    const plansPrimitives = await this.findAll();

    plansPrimitives.forEach(async (plan) => {
      const planInstance = await Plan.deserialize(plansPrimitives[0]);
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

  public async create(plan: Plan): Promise<void> {
    await this.collection.insertOne(MongoPlanConverter.planToMongoPlan(plan));
    console.log("Plan created!! ");
  }
}
