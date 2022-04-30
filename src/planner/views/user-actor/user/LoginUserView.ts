import {
  LoginController,
  LoginMessage,
  LoginResponseMessage,
} from "../../../controllers/LoginController";

export class LoginUserView {
  private loginController: LoginController;
  constructor() {
    this.loginController = new LoginController();
  }

  public async render(
    message: LoginMessage
  ): Promise<LoginResponseMessage | null> {
    const responseMessage = await this.loginController.control(message);

    if (!responseMessage) {
      return null;
    }

    return responseMessage;
  }
}
