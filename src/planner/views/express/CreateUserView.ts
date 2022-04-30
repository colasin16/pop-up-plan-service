import { CreateUserMessage } from "../../controllers/user/CreateUserController";
import { UserController } from "../../controllers/user/UserController";
import { Identifier } from "../../models/Identifier";

export class CreateUserView {
  private userController: UserController;
  constructor() {
    this.userController = new UserController();
  }

  public async render(message: CreateUserMessage): Promise<Identifier | null> {
    try {
      return await this.userController.create(message);
    } catch (e) {
      // Manage domain errors else keep throwing
      return null;
    }
  }
}
