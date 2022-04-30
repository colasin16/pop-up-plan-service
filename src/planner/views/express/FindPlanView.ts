import { Request, Response } from "express";
import { SearchPlanController } from "../../controllers/plan/SearchPlanController";

export class FindPlanView {
  private searchPlanController: SearchPlanController;
  constructor() {
    this.searchPlanController = new SearchPlanController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    try {
      const planPrimitivesList = await this.searchPlanController.control();

      res.status(200).send({
        success: true,
        plans: planPrimitivesList.map((plan) => {
          const ownerId = plan.toPrimitives().owner;

          return {
            ...plan.toPrimitives(),
            ownerId: ownerId,
          };
        }),
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
