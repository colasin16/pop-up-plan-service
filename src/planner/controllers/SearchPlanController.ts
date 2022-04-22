import { Controller } from "../core/Controller";
import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../models/PlanRepository";
import { ControllerReturnMessage } from "../core/types";

export class SearchPlanController extends Controller {
  protected async doControl(message: any): Promise<ControllerReturnMessage> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const planList = await planRepository.findAll();

    return { data: planList.map((plan) => plan.serialize()) };
  }
}
