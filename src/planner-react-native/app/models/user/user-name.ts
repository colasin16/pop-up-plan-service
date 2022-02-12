import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const UserNameModel = types.model("UserName").props({
  firstName: types.string,
  lastName: types.string,
});

type UserNameType = Instance<typeof UserNameModel>;
export interface UserName extends UserNameType {}
type UserNameSnapshotType = SnapshotOut<typeof UserNameModel>;
export interface UserNameSnapshot extends UserNameSnapshotType {}
export const createUserNameDefaultModel = () => types.optional(UserNameModel, {});
