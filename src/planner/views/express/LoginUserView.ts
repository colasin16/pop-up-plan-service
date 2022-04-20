import { Request, Response } from "express";
import {
  LoginController,
  LoginResponseMessage,
} from "../../controllers/LoginController";

export interface loginUserMessage {
  username: string;
  password: string;
}

export class LoginUserView {
  private loginController: LoginController;
  constructor() {
    this.loginController = new LoginController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    const message: loginUserMessage = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const responseMessage: LoginResponseMessage | undefined =
        await this.loginController.control(message);

      if (!responseMessage) {
        res.status(403).send({ success: false, token: "" });
        return;
      }

      res.status(201).send({
        success: true,
        token: responseMessage.token,
        user: responseMessage.user,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
