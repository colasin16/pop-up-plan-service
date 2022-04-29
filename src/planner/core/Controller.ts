import { ResponseData } from "./types";

export abstract class Controller<M> {
  protected abstract validate(message: M): Promise<void>;
  protected abstract doControl(message: M): Promise<ResponseData>;
  public async control(message): Promise<ResponseData> {
    await this.validate(message);
    return await this.doControl(message);
  }
}

