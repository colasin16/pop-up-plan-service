import { Identifier } from "../../models/Identifier";
import { UserModel } from "../../models/User";
import { UserRepository } from "../../models/UserRepository";

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

  public update(user: UserModel): void {
    this.map.set(user.getId().toString(), user);
  }

  public async delete(id: Identifier): Promise<void> {
    let user = await this.find(id);
    user = null;
    this.map.delete(id.toString());
  }
}
