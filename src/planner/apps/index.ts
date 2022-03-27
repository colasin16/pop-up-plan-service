import "reflect-metadata";
import { DependencyInjectionManager } from "../utils/DI/container";
import { PlannerExpress } from "./PlannerExpress";

async function main() {
  try {
    const DIManager = new DependencyInjectionManager();
    await DIManager.setup();

    // prettier-ignore
    new PlannerExpress()
      .setup()
      .listen();
  } catch (e) {
    console.error(e);
  }
}

main();
