import { Id } from "./id";

export type PersistedObject<T> = T & IPersistedObject;
export interface IPersistedObject {
  id: Id;
}
