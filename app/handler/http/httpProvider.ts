import CoreManager from "../../core/core.manager"
import ConfigProvider from "../../driver/config"
import BodyParser from 'body-parser'
import HandlerProvider from "../provider"
import express from 'express'
import router from "./routes"
import socket from "./socket"
import {Server, createServer} from 'http'
import 'express-async-errors'
import ErrorMiddelware from "./middlewares/errors"

export default class HttpHandler implements HandlerProvider{
  m: CoreManager
  c: ConfigProvider
  app: Server
  constructor(m: CoreManager, c: ConfigProvider) {
    this.m = m
    this.c = c
    const app = express()
    app.use(BodyParser.urlencoded())
    app.use(BodyParser.json())
    app.use(router(c, m))

    app.use(ErrorMiddelware(c))
    const socketSvc = socket(c, ...m.smsManager().handlers(), ...m.voiceManager().handlers(), ...m.emailManager().handlers())
    this.app = createServer(app)
    socketSvc(this.app)
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