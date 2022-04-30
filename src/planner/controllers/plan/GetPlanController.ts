import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanPrimitives } from "../../models/plan/PlanPrimitives";
import { PlanRepository } from "../../models/plan/PlanRepository";
import { Identifier } from "../../models/Identifier";

export interface GetPlanMessage {
  id: string;
}

export class GetPlanController {
  public async control(
    message: GetPlanMessage
  ): Promise<PlanPrimitives | null> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const id = Identifier.fromString(message.id);
    return await planRepository.find(id);
  }
}
