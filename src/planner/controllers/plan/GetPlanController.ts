import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/plan/PlanRepository";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/plan/Plan";

export interface GetPlanMessage {
  id: string;
}

export class GetPlanController {
  public async control(message: GetPlanMessage): Promise<Plan | null> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const id = Identifier.fromString(message.id);
    return await planRepository.find(id);
  }
}
