import { User } from "../models/User";
import { CreatePlanMessage, CreatePlanView } from "./CreatePlanView";
import { FindPlanMessage, FindPlanView } from "./FindPlanView";
import { InMemoryPlanRepository } from "../utils/repositories/InMemoryPlanRepository";
import { PlanDocument } from "../models/documents/PlanDocument";
import { InMemoryMockPlanRepository } from "../utils/repositories/InMemoryMockPlanRepository";

export class UserView {
  private user: User;
  private createPlanView: CreatePlanView;
  private findPlanView: FindPlanView;

  constructor() {
    this.user = new User();
    const planRepository = new InMemoryMockPlanRepository(); // TODO: Container + Singleton
    this.createPlanView = new CreatePlanView(this.user, planRepository);
    this.findPlanView = new FindPlanView(this.user, planRepository);
  }

  public createPlan(message: CreatePlanMessage): void {
    this.createPlanView.interact(message);
  }

  public findPlan(message: FindPlanMessage): PlanDocument {
    const response = this.findPlanView.interact(message);
    return response.serialize();
  }
}
