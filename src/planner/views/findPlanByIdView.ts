import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";
import { ObjectId } from "bson";

export interface FindPlanByIdMessage {
  id: string;
}

export class FindPlanByIdView {
  private planRepository: PlanRepository;

  constructor(planRepository: PlanRepository) {
    this.planRepository = planRepository;
  }

  public async interact(message: FindPlanByIdMessage): Promise<Plan | null> {
    const plan_id = new Identifier(new ObjectId(message.id));
    const plan = await this.planRepository.find(plan_id);
    return plan;
  }
}
