import { Request, Response } from "express";
import {
  GetUserController,
  GetUserMessage,
} from "../../controllers/GetUserController";
import { Identifier } from "../../models/Identifier";
import { View } from "../View";

export class GetUserView extends View {
  protected controllerClass = GetUserController;

  public async render(req: Request, res: Response): Promise<void> {
    const message: GetUserMessage = {
      id: Identifier.fromString(req.params.userId),
    };
    try {
      const { data } = await this.control(message);
      res.status(201).send({ success: true, data });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
