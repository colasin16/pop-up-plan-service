import { Request, Response } from "express";
import {
  CreatePlanController,
  CreatePlanMessage,
} from "../../controllers/plan/CreatePlanController";
import { PlanController } from "../../controllers/plan/PlanController";

export class CreatePlanView {
  private planController: PlanController;
  constructor() {
    this.planController = new PlanController();
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
      const plan = await this.planController.create(message);
      res.status(201).send({ success: true, planId: plan });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
