import { Identifier } from "./Identifier";
import { Plan } from "./Plan";
import { Category } from "../types/Category";
import { PlanPrimitives } from "./primitives/PlanPrimitives";

export interface PlanRepository {
  create(plan: Plan): Promise<PlanPrimitives | null>;
  find(id: Identifier): Promise<PlanPrimitives | null>;
  findAll(): Promise<PlanPrimitives[]>;
  findByCategory(category: Category): Promise<PlanPrimitives[]>;
  update(plan: Plan): void;
  delete(id: Identifier): void;
}
