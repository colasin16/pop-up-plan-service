import {
  AmazingPlan,
  BoringPlan,
  FarAwayRunPlan,
  FarAwayWalkPlan,
} from "../../../core/shared/domain/mocks/plan";
import { Plan, Category } from "../../../core/shared/domain/plan";
import { CustomLocation } from "../../../core/types/location";
import type { PlanListRepository } from "../domain/plan-list-repository";

// TODO: Remove when inputs are finished
const plans = [BoringPlan, AmazingPlan, FarAwayWalkPlan, FarAwayRunPlan];
const allPlans = plans.map((plan, index) => ({
  id: `${new Date().setHours(index).valueOf()}`,
  ...plan,
}));

export class PlanListMockRepository implements PlanListRepository {
  findAll(): Promise<Plan[]> {
    return Promise.resolve(allPlans);
  }

  findByCategory(category: Category): Promise<Plan[]> {
    return Promise.resolve(allPlans.filter(plan => plan.category === category));
  }

  findByTime(time: number): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }

  findByLocation(location: CustomLocation): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }
}
