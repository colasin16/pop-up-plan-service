import { CreateJoinRequestMessage } from "../../../controllers/CreateJoinRequestController";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { CreateJoinRequestView } from "../join-request/CreatJoinRequestView";
import { CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";

export class PlanView {
  private readonly createPlanView: CreatePlanView;
  private readonly findPlanView: FindPlanView;
  private readonly createJoinRequestView: CreateJoinRequestView;

  constructor() {
    this.createPlanView = new CreatePlanView();
    this.findPlanView = new FindPlanView();
    this.createJoinRequestView = new CreateJoinRequestView();
  }

  async renderCreate(message: CreatePlanMessage) {
    return await this.createPlanView.render(message);
  }

  async renderFind() {
    return await this.findPlanView.render();
  }

  async renderCreateJoinRequest(message: CreateJoinRequestMessage) {
    await this.createJoinRequestView.render(message);
  }
}
