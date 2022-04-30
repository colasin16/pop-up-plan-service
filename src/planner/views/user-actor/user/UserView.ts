import { LoginMessage } from "../../../controllers/LoginController";
import { CreateUserMessage } from "../../../controllers/user/CreateUserController";
import { CreateUserView } from "./CreateUserView";
import { GetUserView } from "./GetUserView";
import { LoginUserView } from "./LoginUserView";

export class UserView {
  private readonly createUserView: CreateUserView;
  private readonly getUserView: GetUserView;
  private readonly loginUserView: LoginUserView;

  constructor() {
    this.createUserView = new CreateUserView();
    this.getUserView = new GetUserView();
    this.loginUserView = new LoginUserView();
  }

  async renderCreate(message: CreateUserMessage) {
    return await this.createUserView.render(message);
  }

  async renderGet(id: string) {
    return await this.getUserView.render(id);
  }

  async renderLogin(message: LoginMessage) {
    return await this.loginUserView.render(message);
  }
}
