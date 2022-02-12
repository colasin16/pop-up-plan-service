import { User } from "../models/User";
import { CreatePlanMessage, CreatePlanView } from "./CreatePlanView";
import { FindPlanMessage, FindPlanView } from "./FindPlanView";
import { InMemoryPlanRepository } from "../utils/repositories/InMemoryPlanRepository";
import { PlanDocument } from "../models/documents/PlanDocument";

export class UserView {
  private user: User;
  private createPlanView: CreatePlanView;
  private findPlanView: FindPlanView;

  constructor(user: User) {
    this.user = user;
    const planRepository = new InMemoryPlanRepository();
    this.createPlanView = new CreatePlanView(user, planRepository);
    this.findPlanView = new FindPlanView(user, planRepository);
  }

  public createPlan(message: CreatePlanMessage): void {
    this.createPlanView.interact(message);
  }

  public findPlan(message: FindPlanMessage): PlanDocument {
    const response = this.findPlanView.interact(message);
    return response.serialize();
  }
}
