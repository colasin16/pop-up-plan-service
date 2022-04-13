import { ObjectId, WithId } from "mongodb";
import { Plan } from "../../../models/Plan";
import { PlanPrimitives } from "../../../models/primitives/PlanPrimitives";
import { MongoPlan } from "../models/MongoPlan";

export class MongoPlanConverter {
  static planToMongoPlan(plan: Plan): MongoPlan {
    const planPrimitives = plan.serialize();
    return {
      owner: new ObjectId(planPrimitives.owner),
      title: planPrimitives.title,
      location: planPrimitives.location,
      time: planPrimitives.time,
      privacy: planPrimitives.privacy,
      category: planPrimitives.category,
      attendees: planPrimitives.attendees.map(
        (attendeeId) => new ObjectId(attendeeId)
      ),
      description: planPrimitives.description,
    };
  }

  static mongoPlanToPlanPrimitives(
    mongoPlan: WithId<MongoPlan>
  ): PlanPrimitives {
    console.log(
      "🚀 ~ file: PlanConverter.ts ~ line 36 ~ MongoPlanConverter ~ mongoPlan.attendees",
      mongoPlan.attendees
    );

    return {
      id: mongoPlan._id.id.toString(),
      owner: mongoPlan.owner.id.toString(),
      title: mongoPlan.title,
      location: mongoPlan.location,
      time: mongoPlan.time,
      privacy: mongoPlan.privacy,
      category: mongoPlan.category,
      attendees: mongoPlan.attendees.map((_id) => _id.id.toString()),
      description: mongoPlan.description,
    };
  }
}
