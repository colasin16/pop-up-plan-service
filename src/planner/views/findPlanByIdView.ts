import { User } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";

export interface FindPlanByIdMessage {
  id: string;
}

// esta vista... jejejeje
export class FindPlanByIdView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(message: FindPlanByIdMessage): Plan | null {
    const plan = this.planRepository.find(
      new Identifier(message.id)
    );
    return plan;
  }
}
