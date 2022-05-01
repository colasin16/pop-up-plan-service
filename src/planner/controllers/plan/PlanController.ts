import {
  CreatePlanController,
  CreatePlanMessage,
} from "./CreatePlanController";
import { GetPlanController, GetPlanMessage } from "./GetPlanController";
import {
  PostPlanMessageController,
  PostPlanMessageMessage,
} from "./PostPlanMessageController";
import { SearchPlanController } from "./SearchPlanController";

export class PlanController {
  private readonly getPlanController: GetPlanController;
  private readonly searchPlanController: SearchPlanController;
  private readonly createPlanController: CreatePlanController;
  private readonly postPlanMessageController: PostPlanMessageController;

  constructor() {
    this.getPlanController = new GetPlanController();
    this.searchPlanController = new SearchPlanController();
    this.createPlanController = new CreatePlanController();
    this.postPlanMessageController = new PostPlanMessageController();
  }

  public async get(message: GetPlanMessage) {
    return await this.getPlanController.control(message);
  }

  public async search() {
    return await this.searchPlanController.control();
  }

  public async create(message: CreatePlanMessage) {
    return await this.createPlanController.control(message);
  }

  public async postMessage(message: PostPlanMessageMessage) {
    return await this.postPlanMessageController.control(message);
  }
}
