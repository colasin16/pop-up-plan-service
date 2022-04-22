export class Controller {
  protected validate(message) {}
  public async control(message): Promise<any> {
    await this.validate(message);
    return await this.doControl(message);
  }
  protected async doControl(message): Promise<any> {
    throw Error("not implemented");
  }
}

export class ControllerReturnMessage {
  data: object | null;
}
