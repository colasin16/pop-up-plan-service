export class Controller {
  public validate() {}
  public async control(message): Promise<any> {
    return await this.doControl(message);
  }
  protected async doControl(message): Promise<any> {
    throw Error("not implemented");
  }
}
