import { GetUserController as GetUserController } from "../../../controllers/user/GetUserController";
import { Identifier } from "../../../models/Identifier";

import { User } from "../../../models/user/User";

export class GetUserView {
  private GetUserController: GetUserController;
  constructor() {
    this.GetUserController = new GetUserController();
  }

  public async render(id: string): Promise<User | null> {
    try {
      return await this.GetUserController.control({
        id: Identifier.fromString(id),
      });
    } catch (e) {
      // Manage domain errors
      return null;
    }
  }
}
