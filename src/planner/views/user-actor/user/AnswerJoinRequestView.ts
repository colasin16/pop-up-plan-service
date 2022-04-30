import { AnswerJoinRequestMessage } from "../../../controllers/user/AnswerJoinRequestController";
import { UserController } from "../../../controllers/user/UserController";

export class AnswerJoinRequestView {
  private userController: UserController;
  constructor() {
    this.userController = new UserController();
  }

  public async render(message: AnswerJoinRequestMessage): Promise<void> {
    try {
      await this.userController.answerJoinRequest(message);
    } catch (error) {
      // Manage domain errors else keep throwing
    }
  }
}
