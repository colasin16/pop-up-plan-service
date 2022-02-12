import { BoringPlan } from "../../../core/shared/domain/mocks/plan";
import { Plan } from "../../../core/shared/domain/plan";
import { User } from "../../../core/shared/domain/user";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class PlanCreatorHttpRepository implements PlanCreatorRepository {
  create(owner: User, plan: PlanCreationData): Promise<Plan> {
    return Promise.resolve({
      id: new Date().valueOf(),
      ...BoringPlan, // TODO: Remove this since is only for the missing data from screen
      ...plan,
      owner,
    });
  }
}
