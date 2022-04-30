import { User } from "../models/user/User";
import { PlanRepository } from "../models/plan/PlanRepository";
import { Plan } from "../models/plan/Plan";
import { Category } from "../types/Category";

export interface FindPlanByCategoryMessage {
  category: string;
}

export class FindPlanByCategoryView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public async interact(message: FindPlanByCategoryMessage): Promise<Plan[]> {
    const planPrimitivesList = await this.planRepository.findByCategory(
      new Category(message.category)
    );

    return planPrimitivesList;
  }
}
