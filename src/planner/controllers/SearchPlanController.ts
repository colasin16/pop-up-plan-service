import { Controller, ControllerReturnMessage } from "../core/Controller";
import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../models/PlanRepository";

export class SearchPlanController extends Controller {
  protected async doControl(message: any): Promise<ControllerReturnMessage> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const planList = await planRepository.findAll();

    return { data: planList.map((plan) => plan.serialize()) };
  }
}
