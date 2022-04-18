import { Identifier } from "../../models/Identifier";
import { UserPrimitives } from "../../models/primitives/UserPrimitives";
import { User } from "../../models/User";
import { UserRepository } from "../../models/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private map: Map<string, User>;

  constructor() {
    this.map = new Map<string, User>();
  }

  async findByEmail(email: string): Promise<UserPrimitives | null> {
    throw new Error("Method not implemented.");
  }

  public async create(user: User): Promise<UserPrimitives | null> {
    throw new Error("Method not implemented.");

    // await Promise.resolve(this.map.set(user.getId().toString(), user));
    // return user.getId();
  }

  public async find(id: Identifier): Promise<UserPrimitives | null> {
    throw new Error("Method not implemented.");

    // const user = this.map.get(id.toString());
    // if (!user) {
    //   return null;
    // }
    // return user;
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
