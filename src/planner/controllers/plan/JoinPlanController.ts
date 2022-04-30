// import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
// import { Identifier } from "../../models/Identifier";
// import { PlanPrimitives } from "../../models/plan/PlanPrimitives";
// import { PlanRepository } from "../../models/plan/PlanRepository";
// import { UserPrimitives } from "../../models/user/UserPrimitives";

// export interface JoinPlanMessage {
//   plan: PlanPrimitives;
//   petitionOwner: UserPrimitives;
// }

// export class JoinPlanController {
//   public async control(message: JoinPlanMessage): Promise<boolean> {
//     try {
//       const planRepository: PlanRepository = new MongoPlanRepository();

//       const plan = await planRepository.update({});

//       if (!plan) {
//         throw new NotFoundError();
//       }
//     } catch (error) {
//       // Manage domain errors else re throw
//       return false;
//     }
//   }
// }
