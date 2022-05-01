import { GetJoinPlanRequestsController } from "../../../controllers/join-plan-request/GetJoinPlanRequestsController";
import { JoinPlanRequest } from "../../../models/join-plan-request/JoinPlanRequest";

export class GetJoinPlanRequestsView {
  private getJoinPlanRequestController: GetJoinPlanRequestsController;
  constructor() {
    this.getJoinPlanRequestController = new GetJoinPlanRequestsController();
  }

  public async render(): Promise<JoinPlanRequest[]> {
    try {
      return await this.getJoinPlanRequestController.control();
    } catch (e) {
      // TODO: Manage domain errors
      return [];
    }
  }
}
