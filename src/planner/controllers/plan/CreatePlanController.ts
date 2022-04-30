import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/plan/PlanRepository";
import { Category } from "../../types/Category";
import { Privacy } from "../../types/Privacy";
import { Plan } from "../../models/plan/Plan";
import { UserPrimitives } from "../../models/user/UserPrimitives";
import { User } from "../../models/user/User";
import { Identifier } from "../../models/Identifier";

export interface CreatePlanMessage {
  owner: UserPrimitives;
  title: string;
  location: string;
  time: number;
  category: string;
  privacy: string;
  description?: string;
  image?: string;
}

export class CreatePlanController {
  public async control(message: CreatePlanMessage): Promise<Identifier | null> {
    const planRepository: PlanRepository = new MongoPlanRepository();

    const plan = new Plan(
      message.title,
      message.location,
      message.time,
      new Privacy(message.privacy),
      new Category(message.category),
      message.description
    );

    plan.setOwner(User.fromPrimitives(message.owner));
    await planRepository.create(plan);

    return plan.getId();
  }
}
