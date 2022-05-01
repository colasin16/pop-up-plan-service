import { PlanPrimitives } from "../../models/plan/PlanPrimitives";
import { JoinPlanRequestRepository } from "../../models/join-plan-request/JoinPlanRequestRepository";
import { MongoJoinPlanRequestRepository } from "../../infrastructure/mongo-db/repositories/MongoJoinPlanRequestRepository";
import { JoinPlanRequest } from "../../models/join-plan-request/JoinPlanRequest";
import { Plan } from "../../models/plan/Plan";
import { UserPrimitives } from "../../models/user/UserPrimitives";
import { User } from "../../models/user/User";

export interface CreateJoinPlanRequestMessage {
  plan: PlanPrimitives;
  requester: UserPrimitives;
}

export class CreateJoinPlanRequestController {
  public async control(message: CreateJoinPlanRequestMessage): Promise<void> {
    const joinRequestRepository: JoinPlanRequestRepository =
      new MongoJoinPlanRequestRepository();

    const joinRequest = new JoinPlanRequest(
      Plan.fromPrimitives(message.plan),
      User.fromPrimitives(message.requester)
    );

    await joinRequestRepository.create(joinRequest);
  }
}
