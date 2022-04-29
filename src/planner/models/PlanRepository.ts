import { Category } from "../types/Category";
import { Identifier } from "./Identifier";
import { PlanModel } from "./Plan";

export interface PlanRepository {
  create(plan: PlanModel): Promise<PlanModel | null>;
  find(id: Identifier): Promise<PlanModel | null>;
  findAll(): Promise<PlanModel[]>;
  findByCategory(category: Category): Promise<PlanModel[]>;
  update(plan: PlanModel): Promise<PlanModel | null>;
  delete(id: Identifier): void;
}
