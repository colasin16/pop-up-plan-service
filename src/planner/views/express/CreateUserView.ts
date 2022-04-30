import { Request, Response } from "express";

import { UserController } from "../../controllers/user/UserController";
import { FullName } from "../../types/FullName";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserView {
  private userController: UserController;
  constructor() {
    this.userController = new UserController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    const message: CreateUserMessage = {
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    try {
      const user = await this.userController.create(message);
      res.status(201).send({ success: true, user: user });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
