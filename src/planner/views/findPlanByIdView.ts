import { PlanRepository } from "../models/plan-model/PlanRepository";
import { Identifier } from "../core/model/Identifier";
import { PlanModel } from "../models/plan-model/Plan";
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
