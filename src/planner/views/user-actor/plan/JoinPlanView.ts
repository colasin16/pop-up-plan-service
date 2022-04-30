import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { PlanController } from "../../../controllers/plan/PlanController";
import { Identifier } from "../../../models/Identifier";

export class CreatePlanView {
  private planController: PlanController;
  constructor() {
    this.planController = new PlanController();
  }

  public async render(message: JoinPlanMessage): Promise<Identifier | null> {
    try {
      return await this.planController.join(message);
    } catch (e) {
      // Manage domain errors
      return null;
    }
  }
}
