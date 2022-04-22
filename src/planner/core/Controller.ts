import { ResponseData } from "./types";

export class Controller {
  protected async validate(message) {}
  public async control(message): Promise<any> {
    await this.validate(message);
    return await this.doControl(message);
  }
  protected async doControl(message): Promise<ResponseData> {
    throw Error("not implemented");
  }
}

// export class ControllerReturnMessage {
//   data: object | null;
// }
