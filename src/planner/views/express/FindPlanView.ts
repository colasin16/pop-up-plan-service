import { Request, Response } from "express";
import { SearchPlanController } from "../../controllers/SearchPlanController";
import { Plan } from "../../models/Plan";
import { View } from "../View";

export class FindPlanView extends View {
  protected controllerClass = SearchPlanController;

  public async render(req: Request, res: Response): Promise<void> {
    try {
      const { data } = await this.control({});

      res.status(200).send({
        success: true,
        data,
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
