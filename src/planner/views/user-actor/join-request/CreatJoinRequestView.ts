import {
  CreateJoinRequestController,
  CreateJoinRequestMessage,
} from "../../../controllers/CreateJoinRequestController";

export class CreateJoinRequestView {
  private createJoinRequestController: CreateJoinRequestController;
  constructor() {
    this.createJoinRequestController = new CreateJoinRequestController();
  }

  public async render(message: CreateJoinRequestMessage): Promise<void> {
    try {
      await this.createJoinRequestController.control(message);
    } catch (e) {
      // Manage domain errors
    }
  }
}
