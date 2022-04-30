import { Request, Response } from "express";
import {
  GetUserController as GetUserController,
  GetUserMessage,
} from "../../controllers/GetUserController";
import { Identifier } from "../../models/Identifier";
import { UserPrimitives } from "../../models/user/UserPrimitives";
import { User } from "../../models/user/User";

export class GetUserView {
  private GetUserController: GetUserController;
  constructor() {
    this.GetUserController = new GetUserController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    const message: GetUserMessage = {
      id: Identifier.fromString(req.params.userId),
    };
    try {
      const user: User | null = await this.GetUserController.control(message);
      res.status(201).send({ success: true, user: user?.toPrimitives() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
