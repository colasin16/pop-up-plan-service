import { ObjectID } from "bson";

import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanPrimitives } from "../models/primitives/PlanPrimitives";
import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { Category } from "../types/Category";
import { Privacy } from "../types/Privacy";
import { Plan } from "../models/Plan";

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
      new Privacy(message.privacy).value,
      new Category(message.category).value,
      message.description
    );

    if (message.ownerId) {
      plan.setOwner(new Identifier(new ObjectID(message.ownerId)));
    }

    return await planRepository.create(plan);
  }
}
