import { AnswerJoinPlanRequestMessage } from "../../../controllers/user/AnswerJoinRequestController";
import { CreateUserMessage } from "../../../controllers/user/CreateUserController";
import { AnswerJoinPlanRequestView } from "./AnswerJoinRequestView";
import { LoginMessage } from "../../../controllers/LoginController";
import { CreateUserView } from "./CreateUserView";
import { LoginUserView } from "./LoginUserView";
import { GetUserView } from "./GetUserView";

export class UserView {
  private readonly createUserView: CreateUserView;
  private readonly getUserView: GetUserView;
  private readonly answerJoinPlanRequestView: AnswerJoinPlanRequestView;
  private readonly loginUserView: LoginUserView;

  constructor() {
    this.createUserView = new CreateUserView();
    this.getUserView = new GetUserView();
    this.answerJoinPlanRequestView = new AnswerJoinPlanRequestView();
    this.loginUserView = new LoginUserView();
  }

  async renderCreate(message: CreateUserMessage) {
    return await this.createUserView.render(message);
  }

  async renderGet(id: string) {
    return await this.getUserView.render(id);
  }

  async renderAnswerJoinPlanRequest(message: AnswerJoinPlanRequestMessage) {
    await this.answerJoinPlanRequestView.render(message);
  }

  async renderLogin(message: LoginMessage) {
    return await this.loginUserView.render(message);
  }
}
