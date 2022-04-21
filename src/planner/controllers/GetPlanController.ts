import { ObjectID } from "bson";
import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";
import { PlanRepository } from "../models/PlanRepository";

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
