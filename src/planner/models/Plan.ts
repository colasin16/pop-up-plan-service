import { ObjectId } from "bson";
import { Identifier } from "./Identifier";
import { PlanPrimitives } from "./primitives/PlanPrimitives";
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
  private attendees: User[];
  private description?: string;

  public static async deserialize(primitives: PlanPrimitives): Promise<Plan> {
    const plan = new Plan(
      primitives.title,
      primitives.location,
      primitives.time,
      new Privacy(primitives.privacy).value,
      new Category(primitives.category).value,
      primitives.description
    );

    plan.setOwner(await User.deserialize(primitives.owner));
    plan.id = new Identifier(new ObjectId(primitives.id));
    let userPromises: Promise<User>[] = primitives.attendees.map(
      async (atendee) => await User.deserialize(atendee)
    );
    plan.attendees = await Promise.all(userPromises);
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
    this.attendees = new Array<User>();
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

  public addAttendees(attendees: User[]) {
    this.attendees.push(...attendees);
  }

  public serialize(): PlanPrimitives {
    return {
      id: this.id.toString(),
      owner: this.owner.serialize().id,
      title: this.title,
      description: this.description,
      location: this.location,
      time: this.time,
      privacy: this.privacy.value.toString(),
      category: this.category.value.toString(),
      attendees: this.attendees.map((attendee) => attendee.serialize().id),
    };
  }
}
