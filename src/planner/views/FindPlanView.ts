import { User } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { ObjectId } from "bson";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";

export class FindPlanView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(): Plan[] {
    const plans = this.planRepository.findAll();
    // @ts-expect-error
    return plans;
  }
}
