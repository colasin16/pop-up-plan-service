import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";

export class PlanView {
  private readonly createPlanView: CreatePlanView;
  private readonly findPlanView: FindPlanView;

  constructor() {
    this.createPlanView = new CreatePlanView();
    this.findPlanView = new FindPlanView();
  }

  async renderCreate(message: CreatePlanMessage) {
    return await this.createPlanView.render(message);
  }

  async renderFind() {
    return await this.findPlanView.render();
  }
}
