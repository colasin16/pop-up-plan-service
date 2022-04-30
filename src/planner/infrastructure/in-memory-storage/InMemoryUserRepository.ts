import { Identifier } from "../../models/Identifier";
import { UserRepository } from "../../models/user/UserRepository";
import { User } from "../../models/user/User";

export class InMemoryUserRepository implements UserRepository {
  private map: Map<string, User>;

  constructor() {
    this.map = new Map<string, User>();
  }

  async findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<User | null> {
    await Promise.resolve(this.map.set(user.getId().toString(), user));
    return user;
  }

  public async find(id: Identifier): Promise<User | null> {
    const user = this.map.get(id.toString());
    if (!user) {
      return null;
    }
    return user;
  }

  public update(user: User): void {
    this.map.set(user.getId().toString(), user);
  }

  public async delete(id: Identifier): Promise<void> {
    let user = await this.find(id);
    user = null;
    this.map.delete(id.toString());
  }
}
