import { Plan } from "../models/Plan";
import { User } from "../models/User";
import { Category } from "../types/Category";
import { Privacy } from "../types/Privacy";
import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";

export interface CreatePlanMessage {
  owner: string;
  title: string;
  location: string;
  time: number;
  category: string;
  privacy: string;
  description?: string;
  capacity?: number;
}

export class CreatePlanView {
  private user: User;
  private planRepository: PlanRepository;

  constructor (user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(message: CreatePlanMessage): Identifier {
    const plan = new Plan(
      message.title,
      message.location,
      message.time,
      new Privacy(message.privacy).value,
      new Category(message.category).value,
      message.description
    );
    plan.setOwner(new User(message.owner));
    this.planRepository.create(plan);
    return plan.getId();
  }
}
