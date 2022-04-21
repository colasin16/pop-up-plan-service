import { Request, Response } from "express";
import {
  LoginController,
  LoginResponseMessage,
} from "../../controllers/LoginController";
import { View } from "../View";

export interface loginUserMessage {
  username: string;
  password: string;
}

export class LoginUserView extends View {
  protected controllerClass = LoginController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const message: loginUserMessage = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const { data } = await this.control(message);

      if (!data) {
        res.status(403).send({ success: false, token: "" });
        return;
      }

      res.status(201).send({
        success: true,
        data,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
