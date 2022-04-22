import { PlanRepository } from "../../models/PlanRepository";
import { Plan } from "../../models/Plan";
import { Identifier } from "../../models/Identifier";
import { Category } from "../../types/Category";
import { PlanPrimitives } from "../../models/primitives/PlanPrimitives";

export class InMemoryPlanRepository implements PlanRepository {
  private map: Map<string, Plan>;

  constructor() {
    this.map = new Map<string, Plan>();
  }

  public async create(plan: Plan): Promise<Plan | null> {
    await Promise.resolve(this.map.set(plan.getId().toString(), plan));
    return plan;
  }

  public async find(id: Identifier): Promise<Plan | null> {
    const plan = this.map.get(id.toString());
    if (!plan) {
      return null;
    }
    return plan;
  }

  public async findAll(): Promise<Plan[]> {
    const plans = new Array<Plan>();
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

  public update(plan: Plan): Promise<Plan | null> {
    this.map.set(plan.getId().toString(), plan);
    return Promise.resolve(plan);
  }

  public async delete(id: Identifier): Promise<void> {
    let plan = await this.find(id);
    plan = null;
    this.map.delete(id.toString());
  }
}
