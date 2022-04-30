import { Identifier } from "../Identifier";
import { Plan } from "./Plan";
import { Category } from "../../types/Category";

export interface PlanRepository {
  create(plan: Plan): Promise<Plan | null>;
  find(id: Identifier): Promise<Plan | null>;
  findAll(): Promise<Plan[]>;
  findByCategory(category: Category): Promise<Plan[]>;
  update(plan: Plan): Promise<void>;
  delete(id: Identifier): void;
}
