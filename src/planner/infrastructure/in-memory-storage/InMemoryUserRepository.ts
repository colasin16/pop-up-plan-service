import { Identifier } from "../../models/Identifier";
import { UserPrimitives } from "../../models/user/UserPrimitives";
import { User } from "../../models/user/User";
import { UserRepository } from "../../models/user/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private map: Map<string, User>;

  constructor() {
    this.map = new Map<string, User>();
  }

  async findByEmail(email: string): Promise<UserPrimitives | null> {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<UserPrimitives | null> {
    await Promise.resolve(this.map.set(user.getId().toString(), user));
    return user.toPrimitives();
  }

  public async find(id: Identifier): Promise<UserPrimitives | null> {
    const user = this.map.get(id.toString());
    if (!user) {
      return null;
    }
    return user.toPrimitives();
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
