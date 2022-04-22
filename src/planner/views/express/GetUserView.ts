import { Request, Response } from "express";
import {
  GetUserController,
  GetUserMessage,
} from "../../controllers/GetUserController";
import { View } from "../../core/View";
import { Identifier } from "../../models/Identifier";

export class GetUserView extends View {
  protected controllerClass = GetUserController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const message: GetUserMessage = {
      id: Identifier.fromString(req.params.userId),
    };
    const { data } = await this.control(message);
    res.status(201).send({ success: true, data });
  }
}
