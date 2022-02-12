import { UserView } from "../../../../../planner/views/UserView";
import { BoringPlan } from "../../../core/shared/domain/mocks/plan";
import { Plan } from "../../../core/shared/domain/plan";
import { User } from "../../../core/shared/domain/user";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

export class PlanCreatorPrivilegedRepository implements PlanCreatorRepository {
  private userView: UserView;

  constructor() {
    this.userView = new UserView();
  }
  create(owner: User, plan: PlanCreationData): void {
    this.userView.createPlan(plan as any); // TODO:
  }
}
