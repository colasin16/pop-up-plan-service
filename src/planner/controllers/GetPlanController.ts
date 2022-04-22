import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { PlanRepository } from "../models/PlanRepository";
import { ControllerReturnMessage } from "./types";

export interface GetPlanMessage {
  id: string;
}

export class GetPlanController {
  public async control(
    message: GetPlanMessage
  ): Promise<ControllerReturnMessage> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const id = Identifier.fromString(message.id);
    return { data: await planRepository.find(id) };
  }
}