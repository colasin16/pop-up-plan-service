import { Identifier } from "../../core/model/Identifier";
import { UserModel } from "../../models/user-model/UserModel";
import { UserRepository } from "../../models/user-model/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private map: Map<string, UserModel>;

  constructor() {
    this.map = new Map<string, UserModel>();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    throw new Error("Method not implemented.");
  }

  public async create(user: UserModel): Promise<UserModel | null> {
    await Promise.resolve(this.map.set(user.getId().toString(), user));
    return user;
  }

  public async find(id: Identifier): Promise<UserModel | null> {
    const user = this.map.get(id.toString());
    if (!user) {
      return null;
    }
    return user;
  }

  update(object: UserModel): Promise<UserModel | null> {
    this.map.set(object.getId().toString(), object);
    return Promise.resolve(object)
  }

  findAll(): Promise<UserModel[]> {
    throw new Error("Method not implemented.");
  }

  findMultipleObjectsById(ids: Identifier[]): Promise<UserModel[]> {
    throw new Error("Method not implemented.");

  }

  public async delete(id: Identifier): Promise<void> {
    let user = await this.find(id);
    user = null;
    this.map.delete(id.toString());
  }
}
