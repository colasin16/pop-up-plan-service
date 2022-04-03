import { User } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { Plan } from "../models/Plan";

export class FindPlanView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public async interact(): Promise<Plan[]> {
    const plans = await this.planRepository.findAll();
    return plans;
  }
}
