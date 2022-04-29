import { Collection, ObjectId } from "mongodb";
import { autoInjectable } from "tsyringe";
import { Identifier } from "../../../core/model/Identifier";
import { PlanModel } from "../../../models/plan-model/PlanModel";
import { PlanRepository } from "../../../models/plan-model/PlanRepository";
import { Category } from "../../../types/Category";
import { MongoPlanConverter } from "../converters/PlanConverter";
import { MongoPlan } from "../models/MongoPlan";
import { MongoDBClient } from "../MongoDBClient";


@autoInjectable()
export class MongoPlanRepository implements PlanRepository {
  private collection: Collection<MongoPlan>;

  constructor(mongoDBClient?: MongoDBClient) {
    this.collection = mongoDBClient!.client
      .db("FriendInCrime")
      .collection<MongoPlan>("Plans");
  }

  public async find(id: Identifier): Promise<PlanModel | null> {
    const _id = new ObjectId(id.toString());

    const foundItem = await this.collection.findOne({ _id });

    return foundItem ? MongoPlanConverter.mongoPlanToPlan(foundItem) : null;
  }

  public async findAll(): Promise<PlanModel[]> {
    const mongoPlanList = await this.collection.find().toArray();

    return mongoPlanList.map<PlanModel>((planDocument) =>
      MongoPlanConverter.mongoPlanToPlan(planDocument)
    );
  }

  public async findByCategory(category: Category): Promise<PlanModel[]> {
    const plans = new Array<PlanModel>();
    const plansPrimitives = await this.findAll();

    plansPrimitives.forEach((plan) => {
      if (plan.hasCategory(category)) {
        plans.push(plan);
      }
    });

    return plans;
  }

  public async update(plan: PlanModel): Promise<PlanModel | null> {
    const updatedItem = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(plan.getId().toString()) },
      { $set: MongoPlanConverter.planToMongoPlan(plan) }
    );

    if (!updatedItem.value) {
      return null;
    }

    return MongoPlanConverter.mongoPlanToPlan(updatedItem.value);
  }

  public async findMultipleObjectsById(ids: Identifier[]): Promise<PlanModel[]> {
    const oids: ObjectId[] = [];
    ids.forEach(function (item) {
      oids.push(new ObjectId(item.toString()));
    });

    const mongoPlanList = await this.collection.find({ _id: { $in: oids } }).toArray()
    return mongoPlanList.map<PlanModel>((planDocument) =>
      MongoPlanConverter.mongoPlanToPlan(planDocument)
    );
  }

  delete(id: Identifier): void {
    throw new Error("Method not implemented.");
  }

  public async create(plan: PlanModel): Promise<PlanModel | null> {
    const result = await this.collection.insertOne(
      MongoPlanConverter.planToMongoPlan(plan)
    );

    const identifier = Identifier.fromString(result.insertedId.toString());

    const createdItem = await this.find(identifier);

    return createdItem;
  }
}
