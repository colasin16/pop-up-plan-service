import { CreateJoinPlanRequestMessage } from "../../../controllers/join-plan-request/CreateJoinRequestController";
import { CreateJoinPlanRequestView } from "../join-plan-request/CreatJoinPlanRequestView";
import { GetJoinPlanRequestsView } from "../join-plan-request/GetJoinPlanRequestsView";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";
import { PostPlanMessageView } from "./PostPlanMessageView";
import { PostPlanMessageMessage } from "../../../controllers/plan/PostPlanMessageController";

export class PlanView {
  private readonly createPlanView: CreatePlanView;
  private readonly findPlanView: FindPlanView;
  private readonly createJoinPlanRequestView: CreateJoinPlanRequestView;
  private readonly getJoinPlanRequestsView: GetJoinPlanRequestsView;
  private readonly postPlanMessageView: PostPlanMessageView;

  constructor() {
    this.createPlanView = new CreatePlanView();
    this.findPlanView = new FindPlanView();
    this.createJoinPlanRequestView = new CreateJoinPlanRequestView();
    this.getJoinPlanRequestsView = new GetJoinPlanRequestsView();
    this.postPlanMessageView = new PostPlanMessageView();
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

  async renderGetJoinPlanRequests() {
    return await this.getJoinPlanRequestsView.render();
  }

  async renderPostPlanMessage(message: PostPlanMessageMessage) {
    await this.postPlanMessageView.render(message);
  }
}
