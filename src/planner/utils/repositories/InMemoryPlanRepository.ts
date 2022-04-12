import { PlanRepository } from "../../models/PlanRepository";
import { Plan } from "../../models/Plan";
import { Identifier } from "../../models/Identifier";
import { Category } from "../../types/Category";
import { PlanPrimitives } from "../../models/primitives/PlanPrimitives";

export class InMemoryPlanRepository implements PlanRepository {
  private map: Map<string, PlanPrimitives>;

  constructor() {
    this.map = new Map<string, PlanPrimitives>();
  }

  public create(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan.serialize());
    console.log("Plan created!! ", plan.getId().toString());
  }

  public async find(id: Identifier): Promise<Plan | null> {
    const plan = this.map.get(id.toString());
    if (!plan) {
      return null;
    }
    return plan;
  }

  public async findAll(): Promise<PlanPrimitives[]> {
    const plans = new Array<PlanPrimitives>();
    this.map.forEach((plan) => plans.push(plan));
    return plans;
  }

  public async findByCategory(category: Category): Promise<Plan[]> {
    const plans = new Array<Plan>();
    this.map.forEach((plan) => {
      if (plan.hasCategory(category)) {
        plans.push(plan);
      }
    });
    return plans;
  }

  public update(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan);
  }

  public async delete(id: Identifier): Promise<void> {
    let plan = await this.find(id);
    plan = null;
    this.map.delete(id.toString());
  }
}
