import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";
import { ObjectId } from "bson";

export interface FindPlanByOwnerMessage {
  ownerId: string;
}

export class FindPlanByOwnerView {
  private planRepository: PlanRepository;

  constructor(planRepository: PlanRepository) {
    this.planRepository = planRepository;
  }

  public interact(message: FindPlanByOwnerMessage): Plan[] {
    const plan_id =  new Identifier(new ObjectId(message.ownerId));
    const plan = this.planRepository.findByOwner(plan_id);
    return plan;
  }
}
