import { Request, Response } from "express";

import { FindPlanView } from "./express/FindPlanView";
import { LoginUserView } from "./express/LoginUserView";
import { CreatePlanView } from "./express/CreatePlanView";
import { CreateUserView } from "./express/CreateUserView";
import { GetUserView } from "./express/GetUserView";

export class UserViewExpress {
  private createPlanView: CreatePlanView;
  private findPlanView: FindPlanView;
  private createUserView: CreateUserView;
  private getUserView: GetUserView;
  private loginUserView: LoginUserView;

  constructor() {
    this.createPlanView = new CreatePlanView();
    this.findPlanView = new FindPlanView();
    this.createUserView = new CreateUserView();
    this.getUserView = new GetUserView();
    this.loginUserView = new LoginUserView();
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
}
