import { Request, Response } from "express";
import {
  CreatePlanController,
  CreatePlanMessage,
} from "../../controllers/CreatePlanController";
import { StatusCode } from "../../core/statusCodes";
import { View } from "../../core/View";

export class CreatePlanView extends View {
  protected controllerClass = CreatePlanController;

  protected async doRender(req: Request, res: Response): Promise<void> {
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
    const controllerResponseMessage = await this.control(message);
    res
      .status(StatusCode.CREATED_201)
      .send({ success: true, data: controllerResponseMessage.data });
  }
}
