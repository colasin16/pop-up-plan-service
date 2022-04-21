import { Request, Response } from "express";
import { NotFoundError } from "../controllers/exceptions";
import { ControllerReturnMessage } from "../controllers/types";

export class View {
  protected controllerClass;
  private _controllerInstance;

  public async render(req: Request, res: Response): Promise<void> {
    try {
      this.doRender(req, res);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).send("Not found");
      }
    }
  }

  protected async doRender(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  protected control(message): ControllerReturnMessage {
    return this.controllerInstance.control(message);
  }

  private get controllerInstance() {
    return this._controllerInstance
      ? this._controllerInstance
      : new this.controllerClass();
  }
}
