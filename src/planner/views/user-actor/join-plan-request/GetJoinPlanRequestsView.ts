import { GetJoinPlanRequestsController } from "../../../controllers/join-plan-request/GetJoinPlanRequestsController";
import { JoinPlanRequest } from "../../../models/join-plan-request/JoinPlanRequest";

export class GetJoinPlanRequestsView {
  private getJoinPlanRequestsController: GetJoinPlanRequestsController;
  constructor() {
    this.getJoinPlanRequestsController = new GetJoinPlanRequestsController();
  }

  public async render(): Promise<JoinPlanRequest[]> {
    try {
      return await this.getJoinPlanRequestsController.control();
    } catch (error) {
      // TODO: Manage domain errors
      return [];
    }
  }
}
