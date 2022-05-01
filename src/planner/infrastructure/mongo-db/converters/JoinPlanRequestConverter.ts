import { ObjectId } from "mongodb";
import { User } from "../../../models/user/User";
import { JoinPlanRequest } from "../../../models/join-plan-request/JoinPlanRequest";
import { MongoJoinPlanRequest } from "../models/MongoJoinRequest";
import { MongoPlanConverter } from "./PlanConverter";
import { Plan } from "../../../models/plan/Plan";
import { MongoUserConverter } from "./UserConverter";
import { JoinPlanRequestPrimitives } from "../../../models/join-plan-request/JoinPlanRequestPrimitives";

export class MongoJoinPlanRequestConverter {
  static toMongo(joinRequest: JoinPlanRequest): MongoJoinPlanRequest {
    const joinRequestPrimitives = joinRequest.toPrimitives();

    return {
      _id: new ObjectId(joinRequestPrimitives.id.toString()),
      plan: MongoPlanConverter.toMongo(
        Plan.fromPrimitives(joinRequestPrimitives.plan)
      ),
      requester: MongoUserConverter.toMongo(
        User.fromPrimitives(joinRequestPrimitives.requester)
      ),
    };
  }

  static toDomain(mongoJoinPlanRequest: MongoJoinPlanRequest): JoinPlanRequest {
    const joinRequestPrimitives: JoinPlanRequestPrimitives = {
      id: mongoJoinPlanRequest._id.toString(),
      plan: MongoPlanConverter.toDomain(
        mongoJoinPlanRequest.plan
      ).toPrimitives(),
      requester: MongoUserConverter.toDomain(
        mongoJoinPlanRequest.requester
      ).toPrimitives(),
    };

    return JoinPlanRequest.fromPrimitives(joinRequestPrimitives);
  }

  static manyToDomain(
    mongoJoinPlanRequests: MongoJoinPlanRequest[]
  ): JoinPlanRequest[] {
    return mongoJoinPlanRequests.map((joinRequest) =>
      this.toDomain(joinRequest)
    );
  }

  static manyToMongo(joinRequests: JoinPlanRequest[]): MongoJoinPlanRequest[] {
    return joinRequests.map((joinRequest) => this.toMongo(joinRequest));
  }
}
