import { Controller } from "../../core/Controller";
import { ResponseData } from "../../core/types";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../../models/Identifier";
import { PlanRepository } from "../../models/PlanRepository";

export interface GetPlanMessage {
  id: Identifier;
}

export class GetPlanController extends Controller {
  protected async doControl(message: GetPlanMessage): Promise<ResponseData> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const foundPlan = await planRepository.find(message.id);
    return {
      data: foundPlan ? foundPlan.serialize() : null,
      success: true,
      errors: [],
    };
  }
}