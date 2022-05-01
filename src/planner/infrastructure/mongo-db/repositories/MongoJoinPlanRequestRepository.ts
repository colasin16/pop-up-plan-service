import { Collection } from "mongodb";
import { autoInjectable } from "tsyringe";
import { JoinPlanRequest } from "../../../models/join-plan-request/JoinPlanRequest";
import { JoinPlanRequestRepository } from "../../../models/join-plan-request/JoinPlanRequestRepository";
import { MongoJoinPlanRequestConverter } from "../converters/JoinPlanRequestConverter";
import { MongoJoinPlanRequest } from "../models/MongoJoinRequest";
import { MongoDBClient } from "../MongoDBClient";

@autoInjectable()
export class MongoJoinPlanRequestRepository
  implements JoinPlanRequestRepository
{
  private collection: Collection<MongoJoinPlanRequest>;

  constructor(mongoDBClient?: MongoDBClient) {
    this.collection = mongoDBClient!.client
      .db("FriendInCrime")
      .collection<MongoJoinPlanRequest>("JoinPlanRequests");
  }

  public async create(joinRequest: JoinPlanRequest): Promise<void> {
    await this.collection.insertOne(
      MongoJoinPlanRequestConverter.toMongo(joinRequest)
    );
  }

  public async findAll(): Promise<JoinPlanRequest[]> {
    const mongoJoinPlanRequests = await this.collection.find().toArray();
    return mongoJoinPlanRequests.length > 0
      ? MongoJoinPlanRequestConverter.manyToDomain(mongoJoinPlanRequests)
      : [];
  }

  public async update(joinPlanRequest: JoinPlanRequest): Promise<void> {
    const mongoJoinPlanRequest =
      MongoJoinPlanRequestConverter.toMongo(joinPlanRequest);
    await this.collection.findOneAndUpdate(
      { _id: mongoJoinPlanRequest._id },
      { $set: mongoJoinPlanRequest }
    );
  }
}
