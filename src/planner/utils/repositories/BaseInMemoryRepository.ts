import { Identifier } from "../../models/Identifier";
import { IRepository } from "../../models/IRespository";

export class BaseInMemoryRepository implements IRepository {
  protected map: Map<string, any>;

  constructor() {
    this.map = new Map<string, any>();
  }

  public create(obj: any): void {
    this.map.set(obj.getId().toString(), obj);
  }

  public find(id: Identifier): any | null {
    const obj = this.map.get(id.toString());
    if (!obj) {
      return null;
    }
    return obj;
  }

  public update(obj: any): void {
    this.map.set(obj.getId().toString(), obj);
  }

  public delete(id: Identifier): void {
    let obj = this.find(id);
    obj = null;
    this.map.delete(id.toString());
  }
}
