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

  public async create(plan: Plan): Promise<Plan | null> {
    throw new Error("Method not implemented.");
  }

  public async find(id: Identifier): Promise<Plan | null> {
    throw new Error("Method not implemented.");
  }

  public async findAll(): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }

  public async findByCategory(category: Category): Promise<Plan[]> {
    throw new Error("Method not implemented.");
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
