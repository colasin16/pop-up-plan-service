import { ObjectID } from "bson";
import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoPlanRepository } from "../infrastructure/mongo-db/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { PlanRepository } from "../models/PlanRepository";
import { PlanPrimitives } from "../models/primitives/PlanPrimitives";

export interface GetPlanMessage {
  id: string;
}

export class GetPlanController {
  public async control(
    message: GetPlanMessage
  ): Promise<PlanPrimitives | null> {
    const planRepository: PlanRepository = new MongoPlanRepository(
      container.resolve(MongoDBClient)
    );

    const id = new Identifier(new ObjectID(message.id));
    return await planRepository.find(id);
  }
}
