import { Plan } from "../models/Plan";
import { User } from "../models/User";
import { Category } from "../types/Category";
import { Privacy } from "../types/Privacy";
import { PlanRepository } from "../models/PlanRepository";

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

  constructor(user: User, planRepository: PlanRepository) {
    this.user = user;
    this.planRepository = planRepository;
  }

  public interact(message: CreatePlanMessage): void {
    const plan = new Plan(
      message.title,
      message.location,
      message.time,
      new Privacy(message.privacy).value,
      new Category(message.category).value,
      message.description
    );
    this.planRepository.create(plan);
  }
}
