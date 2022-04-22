import { Request, Response } from "express";
import { CreateUserController } from "../../controllers/CreateUserController";
import { StatusCode } from "../../core/statusCodes";
import { View } from "../../core/View";
import { FullName } from "../../types/FullName";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserView extends View {
  protected controllerClass = CreateUserController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const message: CreateUserMessage = {
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    const controllerResponseMessage = await this.control(message);
    res
      .status(StatusCode.CREATED_201)
      .send({ success: true, data: controllerResponseMessage.data });
  }
}
