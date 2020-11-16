import CoreManager from "../core/core.manager"
import CoreRegistry from "../core/core.registry"
import HttpHandler from "../handler/http/httpProvider"
import HandlerProvider from "../handler/provider"
import ConfigProvider from "./config"
import Registry from "./driver.registry"

export class RegistryBase {
  protected r: CoreRegistry
  protected c: ConfigProvider
  protected h: HandlerProvider
  protected m: CoreManager
  set(r: Registry): RegistryBase {
    this.r = r
    return this
  }
  setConfig(c: ConfigProvider): RegistryBase {
    this.c = c
    return this
  }
  setManager(m: CoreManager): RegistryBase {
    this.m = m
    return this
  }
  protected handler(): HandlerProvider {
    if (!this.h) this.h = new HttpHandler(this.m, this.c)
    return this.h
  }
}

export default RegistryBase