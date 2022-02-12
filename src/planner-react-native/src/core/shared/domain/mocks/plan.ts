import { Plan, Privacy, Category } from "../plan";

export const BoringPlan: Plan = {
  id: "1644262344135",
  owner: {
    id: "1644055774364",
    name: { firstName: "Tom", lastName: "Smith" },
  },
  title: "A boring walk",
  location: "Barcelona",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  atendees: [],
  chat: "1644055787449",
};

export const AmazingPlan: Plan = {
  id: "1644262549774",
  owner: {
    id: "1644055918329",
    name: { firstName: "Robert", lastName: "Smith" },
  },
  title: "An amazing run",
  location: "Barcelona",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  atendees: [],
  chat: "1644055924452",
};

export const FarAwayWalkPlan: Plan = {
  id: "1644262555022",
  owner: {
    id: "1644055899237",
    name: { firstName: "Jan", lastName: "Smith" },
  },
  title: "Far away walk",
  location: "Calella",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  atendees: [],
  chat: "1644055906972",
};

export const FarAwayRunPlan: Plan = {
  id: "1644262560702",
  owner: {
    id: "1644055778836",
    name: { firstName: "Martin", lastName: "Smith" },
  },
  title: "Far away run",
  location: "Sitges",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  atendees: [],
  chat: "1644055782685",
};
