import { PlannerExpress } from "./PlannerExpress";

try {
  // prettier-ignore
  new PlannerExpress()
    .setup()
    .listen();
} catch (e) {
  console.error(e);
}
