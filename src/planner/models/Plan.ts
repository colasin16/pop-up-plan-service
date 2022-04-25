import { Category, ECategory } from "../types/Category";
import { EPrivacy, Privacy } from "../types/Privacy";
import { Identifier } from "./Identifier";
import { PlanPrimitives } from "./primitives/PlanPrimitives";

export class Plan {
  private id: Identifier;
  private ownerId: Identifier;
  private title: string;
  private location: string;
  private time: number;
  private privacy: Privacy;
  private category: Category;
  private attendeesId: Identifier[];
  private pendingAttendeesId: Identifier[];
  private rejectedAttendeesId: Identifier[];
  private description?: string;
  private image?: string;

  public static deserialize(primitives: PlanPrimitives): Plan {
    const plan = new Plan(
      primitives.title,
      Identifier.fromString(primitives.ownerId),
      primitives.location,
      primitives.time,
      new Privacy(primitives.privacy).value,
      new Category(primitives.category).value,
      primitives.description,
      primitives.image
    );

    plan.id = Identifier.fromString(primitives.id);
    plan.attendeesId = primitives.attendeesId.map((attendee) =>
      Identifier.fromString(attendee)
    );
    plan.pendingAttendeesId = primitives.pendingAttendeesId.map((attendee) =>
      Identifier.fromString(attendee)
    );
    plan.rejectedAttendeesId = primitives.rejectedAttendeesId.map((attendee) =>
      Identifier.fromString(attendee)
    );
    return plan;
  }

  constructor(
    title: string,
    ownerId: Identifier,
    location: string,
    time: number,
    privacy: EPrivacy,
    category: ECategory,
    description?: string,
    image?: string
  ) {
    // this.id = new Identifier();
    this.title = title;
    this.ownerId = ownerId;
    this.location = location;
    this.time = time;
    this.description = description;
    this.privacy = new Privacy(privacy);
    this.category = new Category(category);
    this.attendeesId = new Array<Identifier>();
    this.pendingAttendeesId = new Array<Identifier>();
    this.rejectedAttendeesId = new Array<Identifier>();
    this.image = image;
  }

  public getId(): Identifier {
    return this.id;
  }

  public setId(id: Identifier) {
    this.id = id;
  }

  public hasCategory(category: Category) {
    return category.equals(this.category);
  }

  public addAttendee(attendee: Identifier) {
    if (attendee.toString() in this.attendeesId.map((id) => id.toString())) {
      // already added to the list
      return;
    }
    this.attendeesId.push(attendee);
  }

  public addPendingAttendee(pendingAttendee: Identifier) {
    if (
      pendingAttendee.toString() in
      this.pendingAttendeesId.map((id) => id.toString())
    ) {
      // already added to pending the list
      return;
    }

    this.pendingAttendeesId.push(pendingAttendee);
  }

  public removePendingAttendee(pendingAttendee: Identifier) {
    if (
      pendingAttendee.toString() in
      this.pendingAttendeesId.map((id) => id.toString())
    ) {
      // already added to pending the list
      return;
    }

    // TODO: how can we optimise this?
    this.pendingAttendeesId = this.pendingAttendeesId.filter(
      (attendee) => attendee.toString() !== pendingAttendee.toString()
    );
  }

  public addRejectedAttendee(rejectedAttendee: Identifier) {
    if (
      rejectedAttendee.toString() in
      this.rejectedAttendeesId.map((id) => id.toString())
    ) {
      // already added to pending the list
      return;
    }

    this.rejectedAttendeesId.push(rejectedAttendee);
  }

  public serialize(): PlanPrimitives {
    return {
      id: this.id?.toString(),
      ownerId: this.ownerId?.toString(),
      title: this.title,
      description: this.description,
      location: this.location,
      time: this.time,
      privacy: this.privacy.value.toString(),
      category: this.category.value.toString(),
      attendeesId: this.attendeesId.map((attendee) => attendee.toString()),
      pendingAttendeesId: this.pendingAttendeesId.map((attendee) =>
        attendee.toString()
      ),
      rejectedAttendeesId: this.rejectedAttendeesId.map((attendee) =>
        attendee.toString()
      ),
      image: this.image,
    };
  }
}
