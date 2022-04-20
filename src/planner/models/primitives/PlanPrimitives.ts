export interface PlanPrimitives {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  location: string;
  time: number;
  privacy: string;
  category: string;
  attendeesId: string[];
  image?: string;
}
