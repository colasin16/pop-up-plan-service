import { Request, Response } from "express";
import { SearchPlanController } from "../../controllers/SearchPlanController";
import { View } from "../../core/View";

export class FindPlanView extends View {
  protected controllerClass = SearchPlanController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const { data } = await this.control({});

    res.status(200).send({
      success: true,
      data,
    });
  }
}
