import { Request, Response } from "express";
import { SearchPlanController } from "../../../controllers/plan/SearchPlanController";
import { Plan } from "../../../models/plan/Plan";

export class FindPlanView {
  private searchPlanController: SearchPlanController;
  constructor() {
    this.searchPlanController = new SearchPlanController();
  }

  public async render(): Promise<Plan[]> {
    try {
      return await this.searchPlanController.control();
    } catch (e) {
      return [];
    }
  }
}
