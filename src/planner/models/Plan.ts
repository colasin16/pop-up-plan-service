import { Identifier } from "./Identifier";
import { ObjectId } from "bson";
import { PlanDocument } from "./documents/PlanDocument";
import { Category, ECategory } from "../types/Category";
import { EPrivacy, Privacy } from "../types/Privacy";
import { User } from "./User";

export class Plan {
  private id: Identifier;
  private owner: User;
  private title: string;
  private location: string;
  private time: number;
  private privacy: Privacy;
  private category: Category;
  private atendees: User[];
  private description?: string;

  public static async deserialize(document: PlanDocument): Promise<Plan> {
    const plan = new Plan(
      document.title,
      document.location,
      document.time,
      document.privacy,
      document.category,
      document.description
    );
    plan.setOwner(await User.deserialize(document.owner));
    plan.id = new Identifier(new ObjectId(document.id));
    let userPromises: Promise<User>[] = document.atendees.map(
      async (atendee) => await User.deserialize(atendee)
    );
    plan.atendees = await Promise.all(userPromises);
    return plan;
  }

  constructor(
    title: string,
    location: string,
    time: number,
    privacy: EPrivacy,
    category: ECategory,
    description?: string
  ) {
    this.id = new Identifier();
    this.title = title;
    this.location = location;
    this.time = time;
    this.description = description;
    this.privacy = new Privacy(privacy);
    this.category = new Category(category);
    this.atendees = new Array<User>();
  }

  public getId(): Identifier {
    return this.id;
  }

  public setOwner(user: User) {
    this.owner = user;
  }

  public hasCategory(category: Category) {
    return category.equals(this.category);
  }

  public addAtendees(atendees: User[]) {
    this.atendees.push(...atendees);
  }

  public serialize(): PlanDocument {
    return {
      id: this.id.toString(),
      owner: this.owner.serialize(),
      title: this.title,
      description: this.description,
      location: this.location,
      time: this.time,
      privacy: this.privacy.value,
      category: this.category.value,
      atendees: this.atendees.map((atendee) => atendee.serialize()),
    };
  }
}
