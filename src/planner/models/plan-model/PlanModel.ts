import { Model } from "../../core/model/Model";
import { Category, ECategory } from "../../types/Category";
import { EPrivacy, Privacy } from "../../types/Privacy";
import { Identifier } from "../../core/model/Identifier";
import { PlanPrimitives } from "./PlanPrimitives";
import { OneToMany } from "../../core/model/OneToMany";
import { UserModel } from "../user-model/UserModel";

export class PlanModel extends Model {
  private id: Identifier;
  private ownerId: Identifier;
  private title: string;
  private location: string;
  private time: number;
  private privacy: Privacy;
  private category: Category;
  private attendees: OneToMany<UserModel>;
  private pendingAttendees: OneToMany<UserModel>;
  private rejectedAttendees: OneToMany<UserModel>;
  private description?: string;
  private image?: string;

  public static deserialize(primitives: PlanPrimitives): PlanModel {
    const plan = new PlanModel(
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

    const attendeesIds = primitives.attendeesId.map((attendee) =>
      Identifier.fromString(attendee)
    )
    plan.attendees = new OneToMany<UserModel>(attendeesIds)


    const pendingAttendeesIds = primitives.pendingAttendeesId.map((attendee) =>
      Identifier.fromString(attendee)
    )
    plan.pendingAttendees = new OneToMany<UserModel>(pendingAttendeesIds)


    const rejectedAttendeesIds = primitives.rejectedAttendeesId.map((attendee) =>
      Identifier.fromString(attendee)
    )
    plan.rejectedAttendees = new OneToMany<UserModel>(rejectedAttendeesIds)



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

    super()

    this.title = title;
    this.ownerId = ownerId;
    this.location = location;
    this.time = time;
    this.description = description;
    this.privacy = new Privacy(privacy);
    this.category = new Category(category);
    this.attendees = new OneToMany<UserModel>();
    this.pendingAttendees = new OneToMany<UserModel>();
    this.rejectedAttendees = new OneToMany<UserModel>();
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
    if (attendee.toString() in this.attendees.values.map((id) => id.toString())) {
      // already added to the list
      return;
    }
    this.attendees.push(attendee);
  }

  public addPendingAttendee(pendingAttendee: Identifier) {
    if (
      pendingAttendee.toString() in
      this.rejectedAttendees.values.map((id) => id.toString())
    ) {
      // already added to pending the list
      return;
    }

    this.pendingAttendees.push(pendingAttendee);
  }

  public removePendingAttendee(pendingAttendee: Identifier) {
    if (
      pendingAttendee.toString() in
      this.pendingAttendees.values.map((id) => id.toString())
    ) {
      // already added to pending the list
      return;
    }

    // TODO: how can we optimise this?
    this.pendingAttendees = new OneToMany<UserModel>(this.pendingAttendees.values.filter(
      (attendee) => attendee.toString() !== pendingAttendee.toString()
    ))
  }

  public addRejectedAttendee(rejectedAttendee: Identifier) {
    if (
      rejectedAttendee.toString() in
      this.rejectedAttendees.values.map((id) => id.toString())
    ) {
      // already added to pending the list
      return;
    }

    this.rejectedAttendees.push(rejectedAttendee);
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
      attendeesId: this.attendees.values.map((attendee) => attendee.toString()),
      pendingAttendeesId: this.pendingAttendees.values.map((attendee) =>
        attendee.toString()
      ),
      rejectedAttendeesId: this.rejectedAttendees.values.map((attendee) =>
        attendee.toString()
      ),
      image: this.image,
    };
  }
}
