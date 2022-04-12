import { Collection } from "mongodb";
import { MongoDBClient } from "../../apps/PlannerMongo";
import { PlanPrimitives } from "../../models/primitives/PlanPrimitives";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/Plan";
import { PlanRepository } from "../../models/PlanRepository";
import { Category } from "../../types/Category";
import { MongoPlan } from "./models/MongoPlan";

export class MongoPlanRepository implements PlanRepository {
  private collection: Collection<MongoPlan>;

  constructor(mongoClient: MongoDBClient) {
    this.collection = mongoClient.client
      .db("FriendInCrime")
      .collection<MongoPlan>("Plans");
  }

  public async find(id: Identifier): Promise<Plan | null> {
    const foundPlan = await this.collection.findOne({
      id: id,
    });
    // @ts-ignore
    return foundPlan;
  }

  public async findAll(): Promise<PlanPrimitives[]> {
    const mongoPlanList = await this.collection.find().toArray();

    const plansPrimitives = mongoPlanList.map<PlanPrimitives>(
      (planDocument) => ({
        id: planDocument._id.id.toString(),
        owner: planDocument.owner.id.toString(),
        title: planDocument.title,
        location: planDocument.location,
        time: planDocument.time,
        privacy: planDocument.privacy,
        category: planDocument.category,
        attendees: planDocument.attendees.map((_id) => _id.id.toString()),
        description: planDocument.description,
      })
    );

    return plansPrimitives;
  }

  public async findByCategory(category: Category): Promise<Plan[]> {
    const plans = new Array<Plan>();
    const plansPrimitives = await this.findAll();

    plansPrimitives.forEach(async (plan) => {
      const planInstance = await Plan.deserialize(plansPrimitives[0]);
      if (planInstance.hasCategory(category)) {
        plans.push(planInstance);
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
    // @ts-ignore
    await this.collection.insertOne(plan);
    console.log("Plan created!! ");
  }
}
