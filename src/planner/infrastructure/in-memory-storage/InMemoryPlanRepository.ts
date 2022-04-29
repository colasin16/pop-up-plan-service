import { Identifier } from "../../core/model/Identifier";
import { PlanModel } from "../../models/plan-model/PlanModel";
import { PlanRepository } from "../../models/plan-model/PlanRepository";
import { Category } from "../../types/Category";

export class InMemoryPlanRepository implements PlanRepository {
  private map: Map<string, PlanModel>;

  constructor() {
    this.map = new Map<string, PlanModel>();
  }

  public async create(plan: PlanModel): Promise<PlanModel | null> {
    await Promise.resolve(this.map.set(plan.getId().toString(), plan));
    return plan;
  }

  public async find(id: Identifier): Promise<PlanModel | null> {
    const plan = this.map.get(id.toString());
    if (!plan) {
      return null;
    }
    return plan;
  }

  public async findAll(): Promise<PlanModel[]> {
    const plans = new Array<PlanModel>();
    this.map.forEach((plan) => plans.push(plan));
    return plans;
  }

  public async findByCategory(category: Category): Promise<PlanModel[]> {
    const plans = new Array<PlanModel>();
    this.map.forEach((plan) => {
      if (plan.hasCategory(category)) {
        plans.push(plan);
      }
    });
    return plans;
  }

  public update(plan: PlanModel): Promise<PlanModel | null> {
    this.map.set(plan.getId().toString(), plan);
    return Promise.resolve(plan);
  }

  findMultipleObjectsById(ids: Identifier[]): Promise<PlanModel[]> {
    const plans = new Array<PlanModel>();
    this.map.forEach((plan) => {
      if (ids.includes(plan.getId())) {
        plans.push(plan);
      }
    });
    return Promise.resolve(plans);
  }

  public async delete(id: Identifier): Promise<void> {
    let plan = await this.find(id);
    plan = null;
    this.map.delete(id.toString());
  }
}
