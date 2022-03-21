import { Plan } from "../../models/Plan";
import { Category } from "../../types/Category";
import { BaseInMemoryRepository } from "./BaseInMemoryRepository";

export class InMemoryPlanRepository extends BaseInMemoryRepository {

  public findAll(): Plan[] {
    const plans = new Array<Plan>();
    this.map.forEach((plan) => plans.push(plan));
    return plans;
  }

  public findByCategory(category: Category): Plan[] {
    const plans = new Array<Plan>();
    this.map.forEach((plan) => {
      if (plan.hasCategory(category)) {
        plans.push(plan);
      }
    });
    return plans;
  }
}
