import "reflect-metadata";
import { DependencyInjectionManager } from "./ioc/container";
import { PartnerInCrimeApp } from "./PartnerInCrimeApp";

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
