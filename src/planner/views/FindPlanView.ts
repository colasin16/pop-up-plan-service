import { User } from "../models/User";
import { PlanRepository } from "../models/PlanRepository";
import { ObjectId } from "bson";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/Plan";

export interface FindPlanMessage {
  id: string;
}

export class FindPlanView {
  private user: User;
  private planRepository: PlanRepository;

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(message: FindPlanMessage): Plan {
    console.log("(findPlanView) i received this message: ", message);
    // const plan = this.planRepository.find(
    //   new Identifier(new ObjectId(message.id))
    // );
    const plan = this.planRepository.findMany()[0];
    return plan;
  }
}
