import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoPlanRepository } from "../infrastructure/mongo-db/MongoPlanRepository";
import { Plan } from "../models/Plan";
import { PlanRepository } from "../models/PlanRepository";

export class SearchPlanController {
  public async control(): Promise<Plan[]> {
    const planRepository: PlanRepository = new MongoPlanRepository(
      container.resolve(MongoDBClient)
    );
    const planPrimitivesList = await planRepository.findAll();

    return planPrimitivesList.map((planPrimitives) =>
      Plan.deserialize(planPrimitives)
    );
  }
}
