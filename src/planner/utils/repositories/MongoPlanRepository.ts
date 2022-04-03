import { Collection, WithId } from "mongodb";
import { MongoDBClient } from "../../apps/PlannerMongo";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/Plan";
import { PlanRepository } from "../../models/PlanRepository";
import { Category } from "../../types/Category";

export class MongoPlanRepository implements PlanRepository {
  // TODO: add type annotation later
  // private collection: Collection;
  // or
  private collection: Collection<Plan>;
  // private collection;

  constructor(mongoClient: MongoDBClient) {
    this.collection = mongoClient.client
      .db("FriendInCrime")
      .collection<Plan>("Plans");
  }

  public async find(id: Identifier): Promise<Plan | null> {
    const foundPlan: WithId<Plan> | null = await this.collection.findOne({
      id: id,
    });

    return foundPlan;
  }

  public async findAll(): Promise<Plan[]> {
    const foundPlans: WithId<Plan>[] = await this.collection.find().toArray();
    return foundPlans;
  }

  public async findByCategory(category: Category): Promise<Plan[]> {
    const plans = new Array<Plan>();
    const allPlans = await this.findAll();
    await allPlans.forEach((plan) => {
      if (plan.hasCategory(category)) {
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
    await this.collection.insertOne(plan);
    console.log("Plan created!! ");
  }
}
