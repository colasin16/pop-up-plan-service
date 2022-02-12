import { PlanRepository } from "../../models/PlanRepository";
import { Plan } from "../../models/Plan";
import { Identifier } from "../../models/Identifier";
import { EPrivacy } from "../../types/Privacy";
import { ECategory } from "../../types/Category";

export class InMemoryMockPlanRepository implements PlanRepository {
  private map: Map<string, Plan>;

  constructor() {
    this.map = new Map<string, Plan>();
  }

  public create(plan: Plan): void {}

  public find(id: Identifier): Plan | null {
    return new Plan("afgasgf", "asfag", 123, EPrivacy.PUBLIC, ECategory.RUN);
  }

  public findMany(): Plan[] {
    return [new Plan("afgasgf", "asfag", 123, EPrivacy.PUBLIC, ECategory.RUN)];
  }

  public update(plan: Plan): void {}

  public delete(id: Identifier): void {}
}
