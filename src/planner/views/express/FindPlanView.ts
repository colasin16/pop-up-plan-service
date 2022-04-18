import { Request, Response } from "express";
import { GetUserByIdController } from "../../controllers/GetUserByIdController";
import { SearchPlanController } from "../../controllers/SearchPlanController";

export class FindPlanView {
  private searchPlanController: SearchPlanController;
  private getUserByIdController: GetUserByIdController;
  constructor() {
    this.searchPlanController = new SearchPlanController();
    this.getUserByIdController = new GetUserByIdController();
  }

  public async render(req: Request, res: Response): Promise<void> {
    try {
      const planPrimitivesList = await this.searchPlanController.control();

      res.status(200).send({
        success: true,
        plans: planPrimitivesList.map((plan) => {
          const ownerId = plan.serialize().ownerId;

          // const owner = await this.getUserByIdController.control({
          //   id: new Identifier(new ObjectID(ownerId)),
          // });

          return {
            ...plan.serialize(),
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
