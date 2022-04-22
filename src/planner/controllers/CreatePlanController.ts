import { Controller, ControllerReturnMessage } from "../core/Controller";
import { MongoPlanRepository } from "../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";
import { PlanRepository } from "../models/PlanRepository";
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

export class CreatePlanController extends Controller {
  protected async doControl(
    message: CreatePlanMessage
  ): Promise<ControllerReturnMessage> {
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
      plan.setOwner(Identifier.fromString(message.ownerId.toString()));
    }

    return { data: await planRepository.create(plan) };
  }
}
