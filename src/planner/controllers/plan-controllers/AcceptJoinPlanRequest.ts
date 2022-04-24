import { Controller } from "../../core/Controller";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../core/ResponseErrors";
import { ResponseData } from "../../core/types";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../../models/Identifier";
import { PlanRepository } from "../../models/PlanRepository";


export enum JoinPlanRequestStatus {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

export interface AcceptOrRejectJoinPlanRequestMessage {
  userId: string;
  planId: string;
  status:JoinPlanRequestStatus;
}

export class AcceptOrRejectJoinPlanRequestController extends Controller {
  protected async doControl(
    message: AcceptOrRejectJoinPlanRequestMessage
  ): Promise<ResponseData> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    if (!plan) {
      throw new NotFoundError();
    }

    if (message.status === JoinPlanRequestStatus.ACCEPT){
      plan.addAttendee(Identifier.fromString(message.userId));
    }else if (message.status === JoinPlanRequestStatus.REJECT){
      throw Error("Implement rejection of a request")
    }
    plan.remotePendingAttendee(Identifier.fromString(message.userId));

    const updatedPlan = await planRepository.update(plan);

    return {
      data: updatedPlan ? updatedPlan.serialize() : null,
      success: true,
      errors: [],
    };
  }

  protected async validate(
    message: AcceptOrRejectJoinPlanRequestMessage
  ): Promise<void> {
    // TODO: If a user already joint, we should response with bad request or do nothing?

    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    if (!plan) {
      throw new NotFoundError();
    }

    const attendees = plan.serialize().attendeesId;

    attendees.forEach((attendee) => {
      if (message.userId === attendee) {
        throw new BadRequestError("you already accepted");
      }
    });

    if (message.userId === plan.serialize().ownerId) {
      throw new InternalServerError(
        "plan owner cannot accept his request, It should'nt have sent join request!"
      );
    }
  }
}
