import { JoinPlanRequest } from "../../models/join-plan-request/JoinPlanRequest";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/plan/PlanRepository";
import { JoinPlanRequestRepository } from "../../models/join-plan-request/JoinPlanRequestRepository";
import { MongoJoinPlanRequestRepository } from "../../infrastructure/mongo-db/repositories/MongoJoinPlanRequestRepository";

export interface AnswerJoinPlanRequestMessage {
  joinRequest: JoinPlanRequest;
  answer: boolean;
}

export class AnswerJoinPlanRequestController {
  public async control(message: AnswerJoinPlanRequestMessage): Promise<void> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const joinPlanRequestRepository: JoinPlanRequestRepository =
      new MongoJoinPlanRequestRepository();

    if (message.answer) {
      message.joinRequest.accept();
    } else {
      message.joinRequest.reject();
    }

    await planRepository.update(message.joinRequest.plan);
    await joinPlanRequestRepository.update(message.joinRequest);
  }
}
