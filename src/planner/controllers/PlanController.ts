import { GetPlanController, GetPlanMessage } from "./GetPlanController";
import { SearchPlanController } from "./SearchPlanController";

export class PlanController {
  private readonly getPlanController: GetPlanController;
  private readonly searchPlanController: SearchPlanController;

  constructor() {
    this.getPlanController = new GetPlanController();
    this.searchPlanController = new SearchPlanController();
  }

  public async get(message: GetPlanMessage) {
    await this.getPlanController.control(message);
  }

  public async search() {
    await this.searchPlanController.control();
  }
}
