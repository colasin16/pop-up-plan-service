import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../../models/Identifier";
import { PlanRepository } from "../../models/PlanRepository";
import { BadRequestError, NotFoundError } from "../../core/ResponseErrors";
import { Controller } from "../../core/Controller";
import { ResponseData } from "../../core/types";

export interface JoinPlanRequestMessage {
  userId: string;
  planId: string;
}

export class JoinPlanRequestController extends Controller {
  protected async doControl(
    message: JoinPlanRequestMessage
  ): Promise<ResponseData> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    if (!plan) {
      throw new NotFoundError();
    }

    plan.addPendingAttendee(Identifier.fromString(message.userId));

    const updatedPlan = await planRepository.update(plan);

    return {
      data: updatedPlan ? updatedPlan.serialize() : null,
      success: true,
      errors: [],
    };
  }

  protected async validate(message: JoinPlanRequestMessage): Promise<void> {
    // TODO: If a user already joint, we should response with bad request or do nothing?

    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    if (!plan) {
      throw new NotFoundError();
    }

    const pendingAttendees = plan.serialize().pendingAttendeesId;

    pendingAttendees.forEach((attendee) => {
      if (message.userId === attendee) {
        throw new BadRequestError("you already joint");
      }
    });

    if (message.userId === plan.serialize().ownerId) {
      throw new BadRequestError("plan owner cannot join to the plan");
    }
  }
}
