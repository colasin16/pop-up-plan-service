import { AnswerJoinPlanRequestMessage } from "../../../controllers/user/AnswerJoinRequestController";
import { UserController } from "../../../controllers/user/UserController";

export class AnswerJoinPlanRequestView {
  private userController: UserController;
  constructor() {
    this.userController = new UserController();
  }

  public async render(message: AnswerJoinPlanRequestMessage): Promise<void> {
    try {
      await this.userController.answerJoinPlanRequest(message);
    } catch (error) {
      // TODO: Manage domain errors else keep throwing
    }
  }
}
