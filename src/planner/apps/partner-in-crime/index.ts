import "reflect-metadata";
import { DependencyInjectionManager } from "./ioc/container";
import { PartnerInCrimeApp } from "./PartnerInCrimeApp";

// TODO:  Check how to handle multiple Running environment, e.g. develop, production ...
// require('dotenv').config({ path: ".env.dev" });
require('dotenv').config({ path: ".env" });

async function main() {
  try {
    const DIManager = new DependencyInjectionManager();
    await DIManager.setup();

    new PartnerInCrimeApp().start().catch(console.error);
  } catch (e) {
    console.error(e);
  }
}

main();
