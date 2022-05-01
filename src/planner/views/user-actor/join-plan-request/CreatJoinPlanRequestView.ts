import {
  CreateJoinPlanRequestController,
  CreateJoinPlanRequestMessage,
} from "../../../controllers/CreateJoinRequestController";

export class CreateJoinPlanRequestView {
  private createJoinPlanRequestController: CreateJoinPlanRequestController;
  constructor() {
    this.createJoinPlanRequestController =
      new CreateJoinPlanRequestController();
  }

  public async render(message: CreateJoinPlanRequestMessage): Promise<void> {
    try {
      await this.createJoinPlanRequestController.control(message);
    } catch (e) {
      // Manage domain errors
    }
  }
}
