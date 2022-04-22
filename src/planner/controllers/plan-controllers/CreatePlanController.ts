import { Controller } from "../../core/Controller";
import { ResponseData } from "../../core/types";
import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { MongoUserRepository } from "../../infrastructure/mongo-db/repositories/MongoUserRepository";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/Plan";
import { PlanRepository } from "../../models/PlanRepository";
import { UserRepository } from "../../models/UserRepository";
import { Category } from "../../types/Category";
import { Privacy } from "../../types/Privacy";

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
  protected async doControl(message: CreatePlanMessage): Promise<ResponseData> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = new Plan(
      message.title,
      Identifier.fromString(message.ownerId),
      message.location,
      message.time,
      new Privacy(message.privacy).value,
      new Category(message.category).value,
      message.description
    );
    const createdPlan = await planRepository.create(plan);

    return {
      data: createdPlan ? createdPlan.serialize() : null,
      success: true,
      errors: [],
    };
  }

  protected async validate(message: CreatePlanMessage): Promise<void> {
    // TODO: implement a validation to prevent adding same plan muliple times
    // TODO: add validation to prevent adding a plan with a ownerId which hasn't been added in DB
  }
}
