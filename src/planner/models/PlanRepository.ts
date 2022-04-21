import { Identifier } from "./Identifier";
import { Plan } from "./Plan";
import { Category } from "../types/Category";
import { PlanPrimitives } from "./primitives/PlanPrimitives";

export interface PlanRepository {
  create(plan: Plan): Promise<Plan | null>;
  find(id: Identifier): Promise<Plan | null>;
  findAll(): Promise<Plan[]>;
  findByCategory(category: Category): Promise<Plan[]>;
  update(plan: Plan): void;
  delete(id: Identifier): void;
}
