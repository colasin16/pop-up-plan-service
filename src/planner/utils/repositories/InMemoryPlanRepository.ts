import { PlanRepository } from "../../models/PlanRepository";
import { Plan } from "../../models/Plan";
import { Identifier } from "../../models/Identifier";

export class InMemoryPlanRepository implements PlanRepository {
  private map: Map<string, Plan>;

  constructor() {
    this.map = new Map<string, Plan>();
  }

  public create(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan);
  }

  public find(id: Identifier): Plan | null {
    const plan = this.map.get(id.toString());
    if (!plan) {
      return null;
    }
    return plan;
  }

  public findMany(): Plan[] {
    const plans = new Array<Plan>();
    this.map.forEach((plan) => plans.push(plan));
    return plans;
  }

  public update(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan);
  }

  public delete(id: Identifier): void {
    let plan = this.find(id);
    plan = null;
    this.map.delete(id.toString());
  }
}
