import { Request, Response } from "express";
import {
  CreatePlanController,
  CreatePlanMessage,
} from "../../controllers/CreatePlanController";
import { Plan } from "../../models/Plan";
import { View } from "../View";

export class CreatePlanView extends View {
  protected controllerClass = CreatePlanController;

  public constructor() {
    super();
  }

  public async render(req: Request, res: Response): Promise<void> {
    const message: CreatePlanMessage = {
      ownerId: req.body.ownerId,
      title: req.body.title,
      location: req.body.location,
      time: req.body.time,
      category: req.body.category,
      privacy: req.body.privacy,
      description: req.body.description,
      image: req.body.image,
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
