import { PlanRepository } from "../models/plan/PlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/plan/Plan";

export interface FindPlanByIdMessage {
  id: string;
}

export class FindPlanByIdView {
  private planRepository: PlanRepository;

  constructor(planRepository: PlanRepository) {
    this.planRepository = planRepository;
  }

  public async interact(message: FindPlanByIdMessage): Promise<Plan | null> {
    const plan_id = Identifier.fromString(message.id);
    return await this.planRepository.find(plan_id);
  }
}
