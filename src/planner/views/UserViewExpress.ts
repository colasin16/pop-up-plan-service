import { Request, Response } from "express";
import { AcceptJoinPlanRequestView } from "./plan-views/AcceptJoinPlanRequestView";
import { CreatePlanView } from "./plan-views/CreatePlanView";
import { FindPlanView } from "./plan-views/FindPlanView";
import { JoinPlanRequestView } from "./plan-views/JoinPlanRequestView";
import { CreateUserView } from "./user-views/CreateUserView";
import { GetUserView } from "./user-views/GetUserView";
import { LoginUserView } from "./user-views/LoginUserView";

export class UserViewExpress {
  private createPlanView: CreatePlanView;
  private joinPlanRequestView: JoinPlanRequestView;
  private acceptJoinPlanRequestView: AcceptJoinPlanRequestView;

  private findPlanView: FindPlanView;
  // private findPlanByCategoryView: FindPlanByCategoryView;
  // private findPlanByIdView: FindPlanByIdView;

  private createUserView: CreateUserView;
  private getUserView: GetUserView;
  private loginUserView: LoginUserView;

  constructor() {
    this.createPlanView = new CreatePlanView();
    this.joinPlanRequestView = new JoinPlanRequestView();
    this.acceptJoinPlanRequestView = new AcceptJoinPlanRequestView();

    this.findPlanView = new FindPlanView();
    this.createUserView = new CreateUserView();
    this.getUserView = new GetUserView();

    this.loginUserView = new LoginUserView();
  }

  public async joinPlanRequest(req: Request, res: Response): Promise<void> {
    await this.joinPlanRequestView.render(req, res);
  }

  public async acceptJoinPlanRequest(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.acceptJoinPlanRequestView.render(req, res);
  }

  public async createPlan(req: Request, res: Response): Promise<void> {
    await this.createPlanView.render(req, res);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    await this.createUserView.render(req, res);
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    await this.getUserView.render(req, res);
  }

  public async authenticateUser(req: Request, res: Response): Promise<void> {
    await this.loginUserView.render(req, res);
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    await this.findPlanView.render(req, res);
  }

  // README: que no se haga la lista muy grande de findByNske findByNscuantos findBySkibidi... Criteria pattern si se va de las manos
  // public async findByCategory(req: Request, res: Response): Promise<void> {
  //   const message: FindPlanByCategoryMessage = {
  //     category: req.params.category,
  //   };
  //     const plans = await this.findPlanByCategoryView.interact(message);
  //     res.status(200).send({
  //       success: true,
  //       plans: plans.map((plan) => {
  //         return {
  //           ...plan.serialize(),
  //           owner: {
  //             id: plan.serialize().owner,
  //             name: {
  //               firstName: "Deivasss",
  //               lastName: "Cuellaar",
  //             },
  //           },
  //         };
  //       }),
  //     });
  // }

  // public async findById(req: Request, res: Response): Promise<void> {
  //   const message: FindPlanByIdMessage = {
  //     id: req.params.id,
  //   };
  //     const plan = await this.findPlanByIdView.interact(message);

  //     if (!plan) {
  //       res.status(404).send("Not found");
  //       return;
  //     }
  //     res.status(200).send({
  //       success: true,
  //       plan: {
  //         ...plan.serialize(),
  //         // TODO: The reason behind this is we don't have coded anything related with plan owners.
  //         // Once everything with plans is working kind of properly we can introduce the owner concept/idea and fix this
  //         owner: {
  //           id: plan.serialize().owner,
  //           name: {
  //             firstName: "Deivasss",
  //             lastName: "Cuellaar",
  //           },
  //         },
  //       },
  //     });
  // }
}
