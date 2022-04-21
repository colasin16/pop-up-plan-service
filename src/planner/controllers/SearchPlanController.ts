import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../models/PlanRepository";
import { Plan } from "../models/Plan";

export class SearchPlanController {
  public async control(): Promise<Plan[]> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const planList = await planRepository.findAll();

    return planList;
  }
}
