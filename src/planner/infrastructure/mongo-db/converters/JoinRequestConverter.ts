import { ObjectId } from "mongodb";
import { User } from "../../../models/user/User";
import { JoinRequest } from "../../../models/join-request/JoinRequest";
import { MongoJoinRequest } from "../models/MongoJoinRequest";
import { MongoPlanConverter } from "./PlanConverter";
import { Plan } from "../../../models/plan/Plan";
import { MongoUserConverter } from "./UserConverter";
import { JoinRequestPrimitives } from "../../../models/join-request/JoinRequestPrimitives";

export class MongoJoinRequestConverter {
  static toMongo(joinRequest: JoinRequest): MongoJoinRequest {
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

  static toDomain(mongoJoinRequest: MongoJoinRequest): JoinRequest {
    const joinRequestPrimitives: JoinRequestPrimitives = {
      id: mongoJoinRequest._id.toString(),
      plan: MongoPlanConverter.toDomain(mongoJoinRequest.plan).toPrimitives(),
      requester: MongoUserConverter.toDomain(
        mongoJoinRequest.requester
      ).toPrimitives(),
    };

    return JoinRequest.fromPrimitives(joinRequestPrimitives);
  }

  static manyToDomain(mongoJoinRequests: MongoJoinRequest[]): JoinRequest[] {
    return mongoJoinRequests.map((joinRequest) => this.toDomain(joinRequest));
  }

  static manyToMongo(joinRequests: JoinRequest[]): MongoJoinRequest[] {
    return joinRequests.map((joinRequest) => this.toMongo(joinRequest));
  }
}
