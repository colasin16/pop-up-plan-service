import { Identifier } from "./Identifier";
import { Plan } from "./Plan";

export interface PlanRepository {
  create(plan: Plan): void;
  find(id: Identifier): Plan | null;
  findMany(): Plan[];
  update(plan: Plan): void;
  delete(id: Identifier): void;
}
