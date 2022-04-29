import { Controller } from "../../core/Controller";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../core/ResponseErrors";
import { ResponseData } from "../../core/types";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../../core/model/Identifier";
import { PlanModel } from "../../models/plan-model/Plan";
import { PlanRepository } from "../../models/plan-model/PlanRepository";


export enum JoinPlanRequestStatus {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

export interface AcceptOrRejectJoinPlanRequestMessage {
  userId: string;
  planId: string;
  status: JoinPlanRequestStatus;
}

export class AcceptOrRejectJoinPlanRequestController extends Controller<AcceptOrRejectJoinPlanRequestMessage> {
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

    if (message.status === JoinPlanRequestStatus.ACCEPT) {
      plan.addAttendee(Identifier.fromString(message.userId));
    } else if (message.status === JoinPlanRequestStatus.REJECT) {
      plan.addRejectedAttendee(Identifier.fromString(message.userId));
    }

    plan.removePendingAttendee(Identifier.fromString(message.userId));

    const updatedPlan = await planRepository.update(plan);

    return {
      data: updatedPlan ? updatedPlan.serialize() : null,
      success: true,
      errors: [],
    };
  }

  protected async validate(message: AcceptOrRejectJoinPlanRequestMessage): Promise<void> {
    // TODO: If a user already joint, we should response with bad request or do nothing?

    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    this.validateNotFound(message, plan)
    this.validateAlreadyAccepted(message, plan)
    this.validateAlreadyRejected(message, plan)
    this.validateUserIsOwner(message, plan)


  }

  private validateUserIsOwner(message: AcceptOrRejectJoinPlanRequestMessage, plan: PlanModel | null) {
    if (message.userId === plan?.serialize().ownerId) {
      throw new InternalServerError(
        "plan owner cannot accept his request, It shouldn't have sent join request!"
      );
    }
  }

  private validateNotFound(message: AcceptOrRejectJoinPlanRequestMessage, plan: PlanModel | null) {
    if (!plan) {
      throw new NotFoundError();
    }
  }

  private validateAlreadyAccepted(message: AcceptOrRejectJoinPlanRequestMessage, plan: PlanModel | null) {
    const attendees = plan?.serialize().attendeesId;

    attendees?.forEach((attendee) => {
      if (message.userId === attendee) {
        throw new BadRequestError("you already accepted");
      }
    });
  }

  private validateAlreadyRejected(message: AcceptOrRejectJoinPlanRequestMessage, plan: PlanModel | null) {
    const rejectedAttendees = plan?.serialize().rejectedAttendeesId;

    rejectedAttendees?.forEach((attendee) => {
      if (message.userId === attendee) {
        throw new BadRequestError("you already rejected");
      }
    });
  }
}
