import { Request, Response } from "express";
import { GetUserController } from "../../controllers/GetUserController";
import { SearchPlanController } from "../../controllers/SearchPlanController";

export class FindPlanView {
  private searchPlanController: SearchPlanController;
  private getUserByIdController: GetUserController;
  constructor() {
    this.searchPlanController = new SearchPlanController();
    this.getUserByIdController = new GetUserController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    try {
      const planPrimitivesList = await this.searchPlanController.control();

      res.status(200).send({
        success: true,
        plans: planPrimitivesList.map((plan) => {
          const ownerId = plan.toPrimitives().ownerId;

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
