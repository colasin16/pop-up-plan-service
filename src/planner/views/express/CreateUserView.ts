import { Request, Response } from "express";
import { CreateUserController } from "../../controllers/CreateUserController";
import { FullName } from "../../types/FullName";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserView {
  private createUserController: CreateUserController;
  constructor() {
    this.createUserController = new CreateUserController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    const message: CreateUserMessage = {
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    try {
      const userId = await this.createUserController.control(message);
      res.status(201).send({ success: true, userId: userId.toString() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
