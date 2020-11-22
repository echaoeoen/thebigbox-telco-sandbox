import CoreRegistry from "../core/core.registry"
import HandlerProvider from "../handler/provider"
import ConfigProvider from "./config"

export interface Registry extends CoreRegistry{
  init(): void
  handler(): HandlerProvider
}

export default Registry