import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../models/plan/PlanRepository";
import { Plan } from "../models/plan/Plan";

export class SearchPlanController {
  public async control(): Promise<Plan[]> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const planPrimitivesList = await planRepository.findAll();

    return planPrimitivesList.map((planPrimitives) =>
      Plan.deserialize(planPrimitives)
    );
  }
}
