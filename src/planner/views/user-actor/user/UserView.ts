import { LoginMessage } from "../../../controllers/LoginController";
import { AnswerJoinRequestMessage } from "../../../controllers/user/AnswerJoinRequestController";
import { CreateUserMessage } from "../../../controllers/user/CreateUserController";
import { AnswerJoinRequestView } from "./AnswerJoinRequestView";
import { CreateUserView } from "./CreateUserView";
import { GetUserView } from "./GetUserView";
import { LoginUserView } from "./LoginUserView";

export class UserView {
  private readonly createUserView: CreateUserView;
  private readonly getUserView: GetUserView;
  private readonly answerJoinRequestView: AnswerJoinRequestView;
  private readonly loginUserView: LoginUserView;

  constructor() {
    this.createUserView = new CreateUserView();
    this.getUserView = new GetUserView();
    this.answerJoinRequestView = new AnswerJoinRequestView();
    this.loginUserView = new LoginUserView();
  }

  async renderCreate(message: CreateUserMessage) {
    return await this.createUserView.render(message);
  }

  async renderGet(id: string) {
    return await this.getUserView.render(id);
  }

  async renderAnswerJoinRequest(message: AnswerJoinRequestMessage) {
    await this.answerJoinRequestView.render(message);
  }

  async renderLogin(message: LoginMessage) {
    return await this.loginUserView.render(message);
  }
}
