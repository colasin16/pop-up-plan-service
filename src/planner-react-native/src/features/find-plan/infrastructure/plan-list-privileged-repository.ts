import { Plan } from "../../../core/shared/domain/plan";
import { PlanListRepository } from "../domain/plan-list-repository";
import { UserView } from "../../../../../planner/views/UserView";

export class PlanListPrivilegedRepository implements PlanListRepository {
  private userView: UserView;
  constructor() {
    this.userView = new UserView();
  }
  findAll(): Promise<Plan[]> {
    return Promise.resolve(allPlans);
  }

  findByCategory(category: Category): Promise<Plan[]> {
    return Promise.resolve(
      allPlans.filter((plan) => plan.category === category)
    );
  }

  findByTime(time: number): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }

  findByLocation(location: CustomLocation): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }
}
