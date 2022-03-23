import { User } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { Plan } from "../models/Plan";
import { Category } from "../types/Category";

export interface FindPlanByCategoryMessage {
  category: string;
}

// esta vista... jejejeje
export class FindPlanByCategoryView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(message: FindPlanByCategoryMessage): Plan[] {
    console.debug(`message.category: ${message.category}`);

    const plans = this.planRepository.findByCategory(
      new Category(message.category)
    );
    return plans;
  }
}
