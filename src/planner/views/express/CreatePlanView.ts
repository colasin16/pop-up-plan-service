import { Request, Response } from "express";
import {
  CreatePlanController,
  CreatePlanMessage,
} from "../../controllers/CreatePlanController";

export class CreatePlanView {
  private createPlanController: CreatePlanController;
  constructor() {
    this.createPlanController = new CreatePlanController();
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
    };
    try {
      const planId = await this.createPlanController.control(message);
      res.status(201).send({ success: true, planId: planId.toString() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
