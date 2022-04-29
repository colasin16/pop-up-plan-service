import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { PlanModel } from "../models/Plan";
import { ObjectId } from "bson";

export interface FindPlanByIdMessage {
  id: string;
}

export class FindPlanByIdView {
  private planRepository: PlanRepository;

  constructor(planRepository: PlanRepository) {
    this.planRepository = planRepository;
  }

  public async interact(message: FindPlanByIdMessage): Promise<PlanModel | null> {
    const plan_id = Identifier.fromString(message.id);
    const plan = await this.planRepository.find(plan_id);
    return plan ? plan : null;
  }
}
