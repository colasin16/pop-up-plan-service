import { ResponseData } from "./types";

export abstract class Controller<M> {
  protected validate(message: M): Promise<void> {
    return Promise.resolve()
  }
  protected abstract doControl(message: M): Promise<ResponseData>;
  public async control(message: M): Promise<ResponseData> {
    await this.validate(message);
    return await this.doControl(message);
  }
}

