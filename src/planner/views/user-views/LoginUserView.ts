import { LoginController } from "../../controllers/user-controllers/LoginController";
import { View } from "../../core/View";

export interface loginUserMessage {
  username: string;
  password: string;
}

export class LoginUserView extends View {
  protected controllerClass = LoginController;
}
