import { JoinRequest } from "./JoinRequest";

export interface JoinRequestRepository {
  create(JoinRequest): Promise<void>;
}
