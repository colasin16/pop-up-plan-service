import { Collection } from "mongodb";
import { autoInjectable } from "tsyringe";
import { JoinRequest } from "../../../models/join-request/JoinRequest";
import { JoinRequestRepository } from "../../../models/join-request/JoinRequestRepository";
import { MongoJoinRequestConverter } from "../converters/JoinRequestConverter";
import { MongoJoinRequest } from "../models/MongoJoinRequest";
import { MongoDBClient } from "../MongoDBClient";

@autoInjectable()
export class MongoJoinRequestRepository implements JoinRequestRepository {
  private collection: Collection<MongoJoinRequest>;

  constructor(mongoDBClient?: MongoDBClient) {
    this.collection = mongoDBClient!.client
      .db("FriendInCrime")
      .collection<MongoJoinRequest>("JoinRequests");
  }

  public async create(joinRequest: JoinRequest): Promise<void> {
    await this.collection.insertOne(
      MongoJoinRequestConverter.toMongo(joinRequest)
    );
  }
}
