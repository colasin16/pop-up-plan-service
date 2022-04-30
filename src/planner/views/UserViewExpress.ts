import { FindPlanView } from "./express/FindPlanView";
import { LoginUserView } from "./express/LoginUserView";
import { CreatePlanView } from "./express/CreatePlanView";
import { CreateUserView } from "./express/CreateUserView";
import { GetUserView } from "./express/GetUserView";
import { CreatePlanMessage } from "../controllers/plan/CreatePlanController";
import { User } from "../models/user/User";
import { Identifier } from "../models/Identifier";
import { Plan } from "../models/plan/Plan";
import { CreateUserMessage } from "../controllers/user/CreateUserController";
import {
  LoginMessage,
  LoginResponseMessage,
} from "../controllers/LoginController";

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

  public async createUser(
    message: CreateUserMessage
  ): Promise<Identifier | null> {
    return await this.createUserView.render(message);
  }

  public async getUser(id: string): Promise<User | null> {
    return await this.getUserView.render(id);
  }

  public async authenticateUser(
    message: LoginMessage
  ): Promise<LoginResponseMessage | null> {
    return await this.loginUserView.render(message);
  }

  public async findAll(): Promise<Plan[]> {
    return await this.findPlanView.render();
  }
}
