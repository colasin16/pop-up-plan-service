import { JoinRequest } from "../../models/join-request/JoinRequest";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/plan/PlanRepository";

export interface AnswerJoinRequestMessage {
  joinRequest: JoinRequest;
  answer: boolean;
}

export class AnswerJoinRequestController {
  public async control(message: AnswerJoinRequestMessage): Promise<void> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    if (message.answer) {
      message.joinRequest.accept();

      await planRepository.update(message.joinRequest.plan);
    } else {
      // TODO: Maybe delete the join request from DB?
    }
  }
}
