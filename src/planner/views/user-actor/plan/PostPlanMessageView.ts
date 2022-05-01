import { PostPlanMessageMessage } from "../../../controllers/plan/PostPlanMessageController";
import { PlanController } from "../../../controllers/plan/PlanController";

export class PostPlanMessageView {
  private planController: PlanController;
  constructor() {
    this.planController = new PlanController();
  }

  public async render(message: PostPlanMessageMessage): Promise<void> {
    try {
      await this.planController.postMessage(message);
    } catch (error) {
      // TODO: Manage domain errors
    }
  }
}
