import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanPrimitives } from "../models/plan/PlanPrimitives";
import { PlanRepository } from "../models/plan/PlanRepository";
import { Category } from "../types/Category";
import { Privacy } from "../types/Privacy";
import { Plan } from "../models/plan/Plan";
import { Identifier } from "../models/Identifier";

export interface CreatePlanMessage {
  ownerId: string;
  title: string;
  location: string;
  time: number;
  category: string;
  privacy: string;
  description?: string;
  image?: string;
}

export class CreatePlanController {
  public async control(
    message: CreatePlanMessage
  ): Promise<PlanPrimitives | null> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = new Plan(
      message.title,
      message.location,
      message.time,
      new Privacy(message.privacy),
      new Category(message.category),
      message.description
    );

    plan.setOwner(Identifier.fromString(message.ownerId));
    return await planRepository.create(plan);
  }
}
