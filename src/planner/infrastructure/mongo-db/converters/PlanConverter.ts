import { ObjectId } from "mongodb";
import { Plan } from "../../../models/plan/Plan";
import { PlanPrimitives } from "../../../models/plan/PlanPrimitives";
import { User } from "../../../models/user/User";
import { Category } from "../../../types/Category";
import { Privacy } from "../../../types/Privacy";
import { MongoPlan } from "../models/MongoPlan";
import { MongoUserConverter } from "./UserConverter";

export class MongoPlanConverter {
  static toDomain(mongoPlan: MongoPlan): Plan {
    const owner = MongoUserConverter.toDomain(mongoPlan.owner);
    const attendees = MongoUserConverter.manyToDomain(mongoPlan.attendees);

    const planPrimitives: PlanPrimitives = {
      id: mongoPlan._id.toString(),
      owner: owner.toPrimitives(),
      title: mongoPlan.title,
      location: mongoPlan.location,
      time: mongoPlan.time,
      privacy: new Privacy(mongoPlan.privacy).value,
      category: new Category(mongoPlan.category).value,
      attendees: attendees.map((attendee) => attendee.toPrimitives()),
      description: mongoPlan.description,
      image: mongoPlan.image,
    };

    return Plan.fromPrimitives(planPrimitives);
  }

  static toMongo(plan: Plan): MongoPlan {
    const planPrimitives = plan.toPrimitives();
    return {
      _id: new ObjectId(planPrimitives.id.toString()),
      owner: MongoUserConverter.toMongo(
        User.fromPrimitives(planPrimitives.owner)
      ),
      title: planPrimitives.title,
      location: planPrimitives.location,
      time: planPrimitives.time,
      privacy: new Privacy(planPrimitives.privacy).value,
      category: new Category(planPrimitives.category).value,
      attendees: MongoUserConverter.manyToMongo(
        planPrimitives.attendees.map((attendee) =>
          User.fromPrimitives(attendee)
        )
      ),
      description: planPrimitives.description,
      image: planPrimitives.image,
    };
  }

  static manyToDomain(mongoPlans: MongoPlan[]): Plan[] {
    return mongoPlans.map((plan) => this.toDomain(plan));
  }

  static manyToMongo(plans: Plan[]): MongoPlan[] {
    return plans.map((plan) => this.toMongo(plan));
  }
}
