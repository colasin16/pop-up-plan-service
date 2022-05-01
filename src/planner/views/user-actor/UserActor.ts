import { CreatePlanMessage } from "../../controllers/plan/CreatePlanController";
import { User } from "../../models/user/User";
import { Identifier } from "../../models/Identifier";
import { Plan } from "../../models/plan/Plan";
import { CreateUserMessage } from "../../controllers/user/CreateUserController";
import {
  LoginMessage,
  LoginResponseMessage,
} from "../../controllers/LoginController";
import { UserView } from "./user/UserView";
import { PlanView } from "./plan/PlanView";
import { CreateJoinPlanRequestMessage } from "../../controllers/join-plan-request/CreateJoinRequestController";
import { AnswerJoinPlanRequestMessage } from "../../controllers/user/AnswerJoinRequestController";

export class UserActor {
  private userView: UserView;
  private planView: PlanView;

  constructor() {
    this.userView = new UserView();
    this.planView = new PlanView();
  }

  public async createPlan(
    message: CreatePlanMessage
  ): Promise<Identifier | null> {
    return await this.planView.renderCreate(message);
  }

  public async createJoinPlanRequest(
    message: CreateJoinPlanRequestMessage
  ): Promise<void> {
    await this.planView.renderCreateJoinPlanRequest(message);
  }

  public async getJoinPlanRequest() {
    return await this.planView.renderGetJoinPlanRequest();
  }

  public async answerJoinPlanRequest(
    message: AnswerJoinPlanRequestMessage
  ): Promise<void> {
    await this.userView.renderAnswerJoinPlanRequest(message);
  }

  public async createUser(
    message: CreateUserMessage
  ): Promise<Identifier | null> {
    return await this.userView.renderCreate(message);
  }

  public async getUser(id: string): Promise<User | null> {
    return await this.userView.renderGet(id);
  }

  public async authenticateUser(
    message: LoginMessage
  ): Promise<LoginResponseMessage | null> {
    return await this.userView.renderLogin(message);
  }

  public async findAll(): Promise<Plan[]> {
    return await this.planView.renderFind();
  }
}
