import { Identifier } from "./Identifier";
import { Plan } from "./Plan";
import { Category } from "../types/Category";

export interface PlanRepository {
  create(plan: Plan): void;
  find(id: Identifier): Plan | null;
  findAll(): Plan[];
  // README: que no se haga la lista muy grande de findByNske findByNscuantos findBySkibidi... [igual que en el UserViewExpress!!]
  findByCategory(category: Category): Plan[];
  update(plan: Plan): void;
  delete(id: Identifier): void;
}
