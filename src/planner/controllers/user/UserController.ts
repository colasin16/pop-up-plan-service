import {
  AnswerJoinRequestController,
  AnswerJoinRequestMessage,
} from "./AnswerJoinRequestController";
import {
  CreateUserController,
  CreateUserMessage,
} from "./CreateUserController";
import { GetUserController, GetUserMessage } from "./GetUserController";

export class UserController {
  private readonly getUserController: GetUserController;
  private readonly createUserController: CreateUserController;
  private readonly answerJoinRequestController: AnswerJoinRequestController;

  constructor() {
    this.getUserController = new GetUserController();
    this.createUserController = new CreateUserController();
    this.answerJoinRequestController = new AnswerJoinRequestController();
  }

  public async get(message: GetUserMessage) {
    return await this.getUserController.control(message);
  }

  public async create(message: CreateUserMessage) {
    return await this.createUserController.control(message);
  }

  public async answerJoinRequest(message: AnswerJoinRequestMessage) {
    await this.answerJoinRequestController.control(message);
  }
}
