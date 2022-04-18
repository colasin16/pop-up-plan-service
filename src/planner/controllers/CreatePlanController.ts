import { ObjectID } from "bson";
import { container } from "tsyringe";
import { MongoDBClient } from "../apps/PlannerMongo";
import { MongoPlanRepository } from "../infrastructure/mongo-db/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";
import { PlanRepository } from "../models/PlanRepository";
import { PlanPrimitives } from "../models/primitives/PlanPrimitives";
import { Category } from "../types/Category";
import { Privacy } from "../types/Privacy";

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
    const planRepository: PlanRepository = new MongoPlanRepository(
      container.resolve(MongoDBClient)
    );

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
