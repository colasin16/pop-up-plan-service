import { PlanRepository } from "../../models/plan/PlanRepository";
import { Plan } from "../../models/plan/Plan";
import { Identifier } from "../../models/Identifier";
import { Category } from "../../types/Category";
import { PlanPrimitives } from "../../models/plan/PlanPrimitives";

export class InMemoryPlanRepository implements PlanRepository {
  private map: Map<string, PlanPrimitives>;

  constructor() {
    this.map = new Map<string, PlanPrimitives>();
  }

  public async create(plan: Plan): Promise<PlanPrimitives | null> {
    await Promise.resolve(
      this.map.set(plan.getId().toString(), plan.toPrimitives())
    );
    return plan.toPrimitives();
  }

  public async find(id: Identifier): Promise<PlanPrimitives | null> {
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

  public async findByCategory(category: Category): Promise<PlanPrimitives[]> {
    const plans = new Array<PlanPrimitives>();
    this.map.forEach((plan) => {
      const planInstance = Plan.fromPrimitives(plan);
      if (planInstance.hasCategory(category)) {
        plans.push(plan);
      }
    });
    return plans;
  }

  public update(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan.toPrimitives());
  }

  public async delete(id: Identifier): Promise<void> {
    let plan = await this.find(id);
    plan = null;
    this.map.delete(id.toString());
  }
}
