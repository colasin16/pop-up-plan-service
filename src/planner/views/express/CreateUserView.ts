import { Request, Response } from "express";
import { CreateUserController } from "../../controllers/CreateUserController";
import { UserPrimitives } from "../../models/primitives/UserPrimitives";
import { FullName } from "../../types/FullName";
import { View } from "../View";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserView extends View {
  protected controllerClass = CreateUserController;

  public async render(req: Request, res: Response): Promise<void> {
    const message: CreateUserMessage = {
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    try {
      const controllerResponseMessage = await this.control(message);
      res
        .status(201)
        .send({ success: true, data: controllerResponseMessage.data });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
