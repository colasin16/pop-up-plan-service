import { UserModel } from "../models/user-model/UserModel";
import { PlanRepository } from "../models/plan-model/PlanRepository";
import { PlanModel } from "../models/plan-model/PlanModel";
import { Category } from "../types/Category";

export interface FindPlanByCategoryMessage {
  category: string;
}

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
