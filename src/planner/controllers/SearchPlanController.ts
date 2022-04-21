import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../models/PlanRepository";
import { ControllerReturnMessage } from "./types";

export class SearchPlanController {
  public async control(message): Promise<ControllerReturnMessage> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const planList = await planRepository.findAll();

    return { data: planList.map((plan) => plan.serialize()) };
  }
}
