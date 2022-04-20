import { Server } from "./server";

export class PartnerInCrimeApp {
  private server?: Server;

  async start() {
    const port = process.env.SERVER_PORT || "8080";
    this.server = new Server(port);

    await this.server.listen();
  }
}
