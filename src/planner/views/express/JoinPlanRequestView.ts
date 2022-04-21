import { Request, Response } from "express";
import {
  JoinPlanRequestController,
  JoinPlanRequestMessage,
} from "../../controllers/JoinPlanRequestController";
import { View } from "../View";

export class JoinPlanRequestView extends View {
  protected controllerClass = JoinPlanRequestController;

  public async doRender(req: Request, res: Response): Promise<void> {
    const planId = req.params.planId;
    console.debug(`planId: ${planId}`);

    const userId = req.body.userId;

    const message: JoinPlanRequestMessage = {
      planId,
      userId,
    };

    try {
      const { data } = await this.control(message);
      res.status(201).send({ success: true, data });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
