import { autoInjectable, container } from "tsyringe";
import { Collection } from "mongodb";

import { MongoPlanConverter } from "../converters/PlanConverter";
import { PlanRepository } from "../../../models/plan/PlanRepository";
import { Identifier } from "../../../models/Identifier";
import { Category } from "../../../types/Category";
import { MongoDBClient } from "../MongoDBClient";
import { MongoPlan } from "../models/MongoPlan";
import { Plan } from "../../../models/plan/Plan";
import { JoinRequestRepository } from "../../../models/join-request/JoinRequestRepository";
import { User } from "../../../models/user/User";
import { JoinRequest } from "../../../models/join-request/JoinRequest";

@autoInjectable()
export class MongoPlanRepository implements JoinRequestRepository {
  private collection: Collection<MongoPlan>;

  constructor(mongoDBClient?: MongoDBClient) {
    this.collection = mongoDBClient!.client
      .db("FriendInCrime")
      .collection<MongoPlan>("JoinRequests");
  }

  public async create(joinRequest: JoinRequest): Promise<void> {
    await this.collection.insertOne();

    return null;
  }
}
