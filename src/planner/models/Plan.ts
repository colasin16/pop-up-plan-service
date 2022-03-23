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

  public static deserialize(document: PlanDocument): Plan {
    const plan = new Plan(
      document.title,
      document.location,
      document.time,
      document.privacy,
      document.category,
      document.description
    );
    plan.setOwner(User.deserialize(document.owner));
    plan.id = new Identifier(new ObjectId(document.id));
    plan.atendees = document.atendees.map((atendee) =>
      User.deserialize(atendee)
    );
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

  public isOwner(ownerId: Identifier) {
    return this.owner.getId() === ownerId;
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
