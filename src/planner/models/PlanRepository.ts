import { Category } from "../types/Category";
import { Identifier } from "./Identifier";
import { Plan } from "./Plan";

export interface PlanRepository {
  create(plan: Plan): Promise<Plan | null>;
  find(id: Identifier): Promise<Plan | null>;
  findAll(): Promise<Plan[]>;
  findByCategory(category: Category): Promise<Plan[]>;
  update(plan: Plan): Promise<Plan | null>;
  delete(id: Identifier): void;
}
