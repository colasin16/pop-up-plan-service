import { ObjectId, WithId } from "mongodb";
import { Identifier } from "../../../models/Identifier";
import { PlanModel } from "../../../models/Plan";
import { PlanPrimitives } from "../../../models/primitives/PlanPrimitives";
import { ECategory } from "../../../types/Category";
import { EPrivacy } from "../../../types/Privacy";
import { MongoPlan } from "../models/MongoPlan";

export class MongoPlanConverter {
  static planToMongoPlan(plan: PlanModel): MongoPlan {
    const planPrimitives = plan.serialize();
    return {
      ownerId: new ObjectId(planPrimitives.ownerId),
      title: planPrimitives.title,
      location: planPrimitives.location,
      time: planPrimitives.time,
      privacy: planPrimitives.privacy,
      category: planPrimitives.category,
      attendeesId: planPrimitives.attendeesId.map(
        (attendeeId) => new ObjectId(attendeeId)
      ),
      pendingAttendeesId: planPrimitives.pendingAttendeesId.map(
        (pendingAttendeeId) => new ObjectId(pendingAttendeeId)
      ),
      rejectedAttendeesId: planPrimitives.rejectedAttendeesId.map(
        (rejectedAttendeesId) => new ObjectId(rejectedAttendeesId)
      ),
      description: planPrimitives.description,
      image: planPrimitives.image,
    };
  }

  static mongoPlanToPlanPrimitives(
    mongoPlan: WithId<MongoPlan>
  ): PlanPrimitives {
    return {
      id: mongoPlan._id.toString(),
      ownerId: mongoPlan.ownerId.toString(),
      title: mongoPlan.title,
      location: mongoPlan.location,
      time: mongoPlan.time,
      privacy: mongoPlan.privacy,
      category: mongoPlan.category,
      attendeesId: mongoPlan.attendeesId.map((_id) => _id.toString()),
      pendingAttendeesId: mongoPlan.pendingAttendeesId.map((_id) =>
        _id.toString()
      ),
      rejectedAttendeesId: mongoPlan.rejectedAttendeesId.map((_id) =>
        _id.toString()
      ),
      description: mongoPlan.description,
      image: mongoPlan.image,
    };
  }

  static mongoPlanToPlan(mongoPlan: WithId<MongoPlan>): PlanModel {
    const plan = new PlanModel(
      mongoPlan.title,
      Identifier.fromString(mongoPlan.ownerId.toString()),
      mongoPlan.location,
      mongoPlan.time,
      mongoPlan.privacy as EPrivacy,
      mongoPlan.category as ECategory,
      mongoPlan.description,
      mongoPlan.image
    );

    plan.setId(Identifier.fromString(mongoPlan._id.toString()));
    mongoPlan.attendeesId.forEach((id) =>
      plan.addAttendee(Identifier.fromString(id.toString()))
    );
    mongoPlan.pendingAttendeesId.forEach((id) =>
      plan.addPendingAttendee(Identifier.fromString(id.toString()))
    );

    return plan;
  }
}
