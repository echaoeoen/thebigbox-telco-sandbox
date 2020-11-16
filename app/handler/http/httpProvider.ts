import CoreManager from "../../core/core.manager";
import ConfigProvider from "../../driver/config";
import HandlerProvider from "../provider";
import express, {Express} from 'express'
import router from "./routes";
import socket from "./socket";
import http from 'http'
export default class HttpHandler implements HandlerProvider{
  m: CoreManager
  c: ConfigProvider
  app: Express
  constructor(m: CoreManager, c: ConfigProvider) {
    this.m = m
    this.c = c
    this.app = express()
    const socketSvc = socket(c, ...m.smsManager().handlers())
    socketSvc(new http.Server(this.app))
    this.app.use(`/`, router(c, m))
  }
  serve(): void {
    this.app.listen(this.c.listenPort(), this.c.listenHost(), () => {
      this.c.logger().info(`app started on ${this.c.listenHost()}:${this.c.listenPort()}`)
    })
  }
  manager(): CoreManager {
    return this.m
  }
  configuration(): ConfigProvider {
    return this.c
  }

}