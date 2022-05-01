import { CreateJoinPlanRequestMessage } from "../../../controllers/CreateJoinRequestController";
import { CreateJoinPlanRequestView } from "../join-plan-request/CreatJoinPlanRequestView";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";

export class PlanView {
  private readonly createPlanView: CreatePlanView;
  private readonly findPlanView: FindPlanView;
  private readonly createJoinPlanRequestView: CreateJoinPlanRequestView;

  constructor() {
    this.createPlanView = new CreatePlanView();
    this.findPlanView = new FindPlanView();
    this.createJoinPlanRequestView = new CreateJoinPlanRequestView();
  }

  async renderCreate(message: CreatePlanMessage) {
    return await this.createPlanView.render(message);
  }

  async renderFind() {
    return await this.findPlanView.render();
  }

  async renderCreateJoinPlanRequest(message: CreateJoinPlanRequestMessage) {
    await this.createJoinPlanRequestView.render(message);
  }
}
