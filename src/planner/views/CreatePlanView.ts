import { Plan } from "../models/Plan";
import { User } from "../models/User";
import { Category } from "../types/Category";
import { Privacy } from "../types/Privacy";
import { PlanRepository } from "../models/PlanRepository";
import { Identifier } from "../models/Identifier";
import { ObjectId } from "bson";

export interface CreatePlanMessage {
  ownerId: string;
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

  public async interact(message: CreatePlanMessage): Promise<Identifier> {
    const plan = new Plan(
      message.title,
      message.location,
      message.time,
      new Privacy(message.privacy).value,
      new Category(message.category).value,
      message.description
    );

    const userId: Identifier = new Identifier(new ObjectId(message.ownerId));
    plan.setOwner(userId);
    this.planRepository.create(plan);
    return plan.getId();
  }
}
