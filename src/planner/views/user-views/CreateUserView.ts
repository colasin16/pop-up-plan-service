import { CreateUserController } from "../../controllers/user-controllers/CreateUserController";
import { View } from "../../core/View";
import { FullName } from "../../types/FullName";

export interface CreateUserMessage {
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CreateUserView extends View {
  protected controllerClass = CreateUserController;
}
