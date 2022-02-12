import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Category, Privacy } from "../../../src/core/shared/domain/plan";
import { UserModel } from "../user/user";

export const PlanModel = types.model("Plan").props({
  id: types.identifier,
  title: types.string,
  category: types.enumeration(Object.values(Category)),
  privacy: types.enumeration(Object.values(Privacy)),
  owner: UserModel,
  location: types.string,
  time: types.number,
  atendees: types.array(UserModel),
  chat: types.string,
});

type PlanType = Instance<typeof PlanModel>;
export interface Plan extends PlanType {}
type PlanSnapshotType = SnapshotOut<typeof PlanModel>;
export interface PlanSnapshot extends PlanSnapshotType {}
export const createPlanDefaultModel = () => types.optional(PlanModel, {});
