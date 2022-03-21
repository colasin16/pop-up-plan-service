import { Identifier } from "./Identifier";

export interface IRepository {
  create(obj: any): void;
  find(id: Identifier): any | null;
  update(obj: any): void;
  delete(id: Identifier): void;
}
