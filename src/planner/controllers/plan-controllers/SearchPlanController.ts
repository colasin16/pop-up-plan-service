import { Controller } from "../../core/Controller";
import { ResponseData } from "../../core/types";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/PlanRepository";

export class SearchPlanController extends Controller {
  protected async doControl(message: any): Promise<ResponseData> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const planList = await planRepository.findAll();

    const data = planList.map((plan) => plan.serialize());

    return { data, success: true, errors: [] };
  }
}
