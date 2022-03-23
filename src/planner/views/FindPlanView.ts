import { Plan } from "../models/Plan";
import { PlanRepository } from "../models/PlanRepository";
import { User } from "../models/User";

export class FindPlanView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(): Plan[] {
    const plans = this.planRepository.findAll();
    return plans;
  }
}
