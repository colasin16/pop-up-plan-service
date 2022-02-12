import { ECategory } from "../../types/Category";
import { EPrivacy } from "../../types/Privacy";
import { UserDocument } from "./UserDocument";

export interface PlanDocument {
  id: string;
  owner: UserDocument;
  title: string;
  description?: string;
  location: string;
  time: number;
  privacy: EPrivacy;
  category: ECategory;
  atendees: UserDocument[];
}
