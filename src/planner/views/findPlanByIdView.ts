import { User } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";
import { ObjectId } from "bson";

export interface FindPlanByIdMessage {
  id: string;
}

// esta vista... jejejeje
export class FindPlanByIdView {
  private planRepository: PlanRepository;

  constructor(planRepository: PlanRepository) {
    this.planRepository = planRepository;
  }

  public interact(message: FindPlanByIdMessage): Plan | null {
    const plan_id =  new Identifier(new ObjectId(message.id));
    const plan = this.planRepository.find(plan_id);
    return plan;
  }
}
