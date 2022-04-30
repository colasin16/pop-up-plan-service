import { Identifier } from "../Identifier";
import { PlanPrimitives } from "./PlanPrimitives";
import { Category, ECategory } from "../../types/Category";
import { EPrivacy, Privacy } from "../../types/Privacy";

export class Plan {
  private id: Identifier;
  private ownerId: Identifier;
  private title: string;
  private location: string;
  private time: number;
  private privacy: Privacy;
  private category: Category;
  private attendeesId: Identifier[];
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

    // settear los attendees
    // const users = primitives.attendees.map((attendee: UserPrimitives) => User.fromPrimitives(attendee))

    plan.setOwner(Identifier.fromString(primitives.ownerId));
    plan.id = Identifier.fromString(primitives.id);
    plan.attendeesId = primitives.attendeesId.map((attendee) =>
      Identifier.fromString(attendee)
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
    this.attendeesId = new Array<Identifier>();
    this.image = image;
  }

  public getId(): Identifier {
    return this.id;
  }

  public setOwner(userId: Identifier) {
    this.ownerId = userId;
  }

  public hasCategory(category: Category) {
    return category.equals(this.category);
  }

  public addAttendees(attendees: Identifier[]) {
    this.attendeesId.push(...attendees);
  }

  public toPrimitives(): PlanPrimitives {
    return {
      id: this.id.toString(),
      ownerId: this.ownerId.toString(),
      title: this.title,
      description: this.description,
      location: this.location,
      time: this.time,
      privacy: this.privacy.value.toString(),
      category: this.category.value.toString(),
      attendeesId: this.attendeesId.map((attendee) => attendee.toString()),
      image: this.image,
    };
  }
}
