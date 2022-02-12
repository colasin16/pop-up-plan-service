import { Plan } from "../../../core/shared/domain/plan";
import { User } from "../../../core/shared/domain/user";
import { PlanCreationData } from "./plan-creation-data";

export interface PlanCreatorRepository {
  create(owner: User, plan: PlanCreationData): void;
}
