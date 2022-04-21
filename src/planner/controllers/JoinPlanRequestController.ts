import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { PlanRepository } from "../models/PlanRepository";
import { NotFoundError } from "./exceptions";
import { ControllerReturnMessage } from "./types";

export interface JoinPlanRequestMessage {
  userId: string;
  planId: string;
}

export class JoinPlanRequestController {
  public async control(
    message: JoinPlanRequestMessage
  ): Promise<ControllerReturnMessage> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    console.debug("Hooooooooooraaaay!");

    const plan = await planRepository.find(
      Identifier.fromString(message.planId)
    );

    if (!plan) {
      throw NotFoundError;
    }

    plan.addAttendees([Identifier.fromString(message.userId)]);

    planRepository.update(plan);

    return { data: null };

    // const plan = new Plan(
    //   message.title,
    //   message.location,
    //   message.time,
    //   new Privacy(message.privacy).value,
    //   new Category(message.category).value,
    //   message.description
    // );

    // if (message.ownerId) {
    //   plan.setOwner(new Identifier(new ObjectID(message.ownerId)));
    // }

    // return await planRepository.create(plan);
  }
}
