import { PlanPrimitives } from "../models/plan/PlanPrimitives";
import { JoinRequestRepository } from "../models/join-request/JoinRequestRepository";
import { MongoJoinRequestRepository } from "../infrastructure/mongo-db/repositories/MongoJoinRequestRepository";
import { JoinRequest } from "../models/join-request/JoinRequest";
import { Plan } from "../models/plan/Plan";
import { UserPrimitives } from "../models/user/UserPrimitives";
import { User } from "../models/user/User";

export interface CreateJoinRequestMessage {
  plan: PlanPrimitives;
  requester: UserPrimitives;
}

export class CreateJoinRequestController {
  public async control(message: CreateJoinRequestMessage): Promise<void> {
    const joinRequestRepository: JoinRequestRepository =
      new MongoJoinRequestRepository();

    const joinRequest = new JoinRequest(
      Plan.fromPrimitives(message.plan),
      User.fromPrimitives(message.requester)
    );

    await joinRequestRepository.create(joinRequest);
  }
}
