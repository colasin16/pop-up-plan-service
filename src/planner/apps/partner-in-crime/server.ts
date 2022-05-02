import * as bodyParser from "body-parser";
import express from "express";
import Router from "express-promise-router";
import * as http from "http";
import cors from "cors";
import { registerRoutes } from "./routes";
import { timeStamp } from "console";
import { authenticateTokenMiddleware } from "./middlewares/VerifyToken";

export class Server {
  private express: express.Express;
  readonly port: string;
  httpServer!: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(cors());
    // TODO: exclude login api: https://thewebdev.info/2021/09/12/how-to-exclude-a-route-from-running-an-express-middleware/
    this.express.use(authenticateTokenMiddleware)
    const router = Router();
    this.express.use(router);
    registerRoutes(router);
  }

  async listen(): Promise<void> {
    await new Promise<void>(
      (resolve) => (this.httpServer = this.express.listen(this.port, resolve))
    );
    console.info(
      `  HTTP App is running at http://localhost:${this.port
      } in ${this.express.get("env")} mode`
    );
    console.info("  Press CTRL-C to stop\n");
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
