import { JoinPlanRequest } from "../../models/join-plan-request/JoinPlanRequest";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/plan/PlanRepository";

export interface AnswerJoinPlanRequestMessage {
  joinRequest: JoinPlanRequest;
  answer: boolean;
}

export class AnswerJoinPlanRequestController {
  public async control(message: AnswerJoinPlanRequestMessage): Promise<void> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    if (message.answer) {
      message.joinRequest.accept();

      await planRepository.update(message.joinRequest.plan);
    } else {
      // TODO: Maybe delete the join request from DB?
    }
  }
}
