import { ObjectId, WithId } from "mongodb";
import { Plan } from "../../../models/plan/Plan";
import { PlanPrimitives } from "../../../models/plan/PlanPrimitives";
import { MongoPlan } from "../models/MongoPlan";

export class MongoPlanConverter {
  static planToMongoPlan(plan: Plan): MongoPlan {
    const planPrimitives = plan.toPrimitives();
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
      description: planPrimitives.description,
      image: planPrimitives.description,
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
      description: mongoPlan.description,
      image: mongoPlan.image,
    };
  }
}
