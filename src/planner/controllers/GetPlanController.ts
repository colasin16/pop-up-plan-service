import { ObjectID } from "bson";

import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanPrimitives } from "../models/primitives/PlanPrimitives";
import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";

export interface GetPlanMessage {
  id: string;
}

export class GetPlanController {
  public async control(
    message: GetPlanMessage
  ): Promise<PlanPrimitives | null> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const id = new Identifier(new ObjectID(message.id));
    return await planRepository.find(id);
  }
}
