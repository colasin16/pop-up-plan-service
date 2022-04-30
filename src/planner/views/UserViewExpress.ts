import { Request, Response } from "express";

import { FindPlanView } from "./express/FindPlanView";
import { LoginUserView } from "./express/LoginUserView";
import { CreatePlanView } from "./express/CreatePlanView";
import { CreateUserView } from "./express/CreateUserView";
import { GetUserView } from "./express/GetUserView";
import { CreatePlanMessage } from "../controllers/plan/CreatePlanController";
import { User } from "../models/user/User";
import { Identifier } from "../models/Identifier";

export class UserView {
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

  public async createPlan(
    message: CreatePlanMessage
  ): Promise<Identifier | null> {
    return await this.createPlanView.render(message);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    await this.createUserView.render(req, res);
  }

  public async getUser(id: string): Promise<User | null> {
    return await this.getUserView.render(id);
  }

  public async authenticateUser(req: Request, res: Response): Promise<void> {
    await this.loginUserView.render(req, res);
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    await this.findPlanView.render(req, res);
  }
}
