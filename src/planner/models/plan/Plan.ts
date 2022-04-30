import { Identifier } from "../Identifier";
import { PlanPrimitives } from "./PlanPrimitives";
import { Category } from "../../types/Category";
import { Privacy } from "../../types/Privacy";
import { User } from "../user/User";

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
  private image?: string;

  public static fromPrimitives(primitives: PlanPrimitives): Plan {
    const plan = new Plan(
      primitives.title,
      primitives.location,
      primitives.time,
      new Privacy(primitives.privacy),
      new Category(primitives.category),
      primitives.description,
      primitives.image
    );

    plan.id = Identifier.fromString(primitives.id);
    plan.setOwner(User.fromPrimitives(primitives.owner));
    plan.attendees = primitives.attendees.map((attendee) =>
      User.fromPrimitives(attendee)
    );
    return plan;
  }

  constructor(
    title: string,
    location: string,
    time: number,
    privacy: Privacy,
    category: Category,
    description?: string,
    image?: string
  ) {
    this.id = new Identifier();
    this.title = title;
    this.location = location;
    this.time = time;
    this.description = description;
    this.privacy = privacy;
    this.category = category;
    this.attendees = new Array<User>();
    this.image = image;
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

  public toPrimitives(): PlanPrimitives {
    return {
      id: this.id.toString(),
      owner: this.owner.toPrimitives(),
      title: this.title,
      description: this.description,
      location: this.location,
      time: this.time,
      privacy: this.privacy.value,
      category: this.category.value,
      attendees: this.attendees.map((attendee) => attendee.toPrimitives()),
      image: this.image,
    };
  }
}
