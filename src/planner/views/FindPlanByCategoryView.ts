import { UserModel } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { PlanModel } from "../models/Plan";
import { Category } from "../types/Category";

export interface FindPlanByCategoryMessage {
  category: string;
}

// esta vista... jejejeje
export class FindPlanByCategoryView {
  private user: UserModel;
  private planRepository: PlanRepository;

  constructor(user: UserModel, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public async interact(message: FindPlanByCategoryMessage): Promise<PlanModel[]> {
    const planList = await this.planRepository.findByCategory(
      new Category(message.category)
    );

    return planList;
  }
}
