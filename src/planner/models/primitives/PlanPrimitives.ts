export interface PlanPrimitives {
  id: string;
  owner: string;
  title: string;
  description?: string;
  location: string;
  time: number;
  privacy: string;
  category: string;
  attendees: string[];
}
