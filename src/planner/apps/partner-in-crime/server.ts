import * as bodyParser from "body-parser";
// import compress from 'compression';
// import errorHandler from 'errorhandler';
// const express = require("express");
import express from "express";
import Router from "express-promise-router";
// import helmet from 'helmet';
import * as http from "http";
import cors from "cors";
// import Logger from "../../contexts/_core/domain/Logger";
// import { container } from "./ioc/installer";
import { registerRoutes } from "./routes";
// import { coreTypes } from "../_core/ioc/coreTypes";

export class Server {
  private express: express.Express;
  readonly port: string;
  httpServer!: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    // this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cors());
    // // this.express.use(helmet.xssFilter());
    // this.express.use(helmet.noSniff());
    // this.express.use(helmet.hidePoweredBy());
    // this.express.use(helmet.frameguard({ action: 'deny' }));
    // this.express.use(compress());
    const router = Router();
    // router.use(errorHandler());
    this.express.use(router);
    registerRoutes(router);
  }

  async listen(): Promise<void> {
    await new Promise<void>(
      (resolve) => (this.httpServer = this.express.listen(this.port, resolve))
    );
    console.info(
      `  HTTP App is running at http://localhost:${
        this.port
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
