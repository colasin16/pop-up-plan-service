import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { PlanRepository } from "../models/PlanRepository";
import { NotFoundError } from "../core/ResponseErrors";
import { Controller, ControllerReturnMessage } from "../core/Controller";

export interface JoinPlanRequestMessage {
  userId: string;
  planId: string;
}

export class JoinPlanRequestController extends Controller {
  protected async doControl(
    message: JoinPlanRequestMessage
  ): Promise<ControllerReturnMessage> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    if (!plan) {
      throw new NotFoundError();
    }

    plan.addAttendees([Identifier.fromString(message.userId)]);

    planRepository.update(plan);

    return { data: null };
  }
}
