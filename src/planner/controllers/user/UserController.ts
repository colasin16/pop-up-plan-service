import {
  AnswerJoinPlanRequestController,
  AnswerJoinPlanRequestMessage,
} from "./AnswerJoinRequestController";
import {
  CreateUserController,
  CreateUserMessage,
} from "./CreateUserController";
import { GetUserController, GetUserMessage } from "./GetUserController";

export class UserController {
  private readonly getUserController: GetUserController;
  private readonly createUserController: CreateUserController;
  private readonly answerJoinPlanRequestController: AnswerJoinPlanRequestController;

  constructor() {
    this.getUserController = new GetUserController();
    this.createUserController = new CreateUserController();
    this.answerJoinPlanRequestController =
      new AnswerJoinPlanRequestController();
  }

  public async get(message: GetUserMessage) {
    return await this.getUserController.control(message);
  }

  public async create(message: CreateUserMessage) {
    return await this.createUserController.control(message);
  }

  public async answerJoinPlanRequest(message: AnswerJoinPlanRequestMessage) {
    await this.answerJoinPlanRequestController.control(message);
  }
}
