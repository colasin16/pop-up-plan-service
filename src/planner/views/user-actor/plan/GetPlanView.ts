import { GetPlanController, GetPlanMessage } from "../../../controllers/plan/GetPlanController";
import { Plan } from "../../../models/plan/Plan";

export class GetPlanView {
  private getPlanController: GetPlanController;

  constructor() {
    this.getPlanController = new GetPlanController();
  }

  public async render(message: GetPlanMessage): Promise<Plan | null> {
    try {
      return await this.getPlanController.control(message);
    } catch (error) {
      // TODO: Manage domain errors
      return null;
    }
  }
}
