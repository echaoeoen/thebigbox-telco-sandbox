import CoreManager from "../core/core.manager"
import CoreManagerDefault from "../core/core.manager.default"
import HandlerProvider from "../handler/provider"
import EmailLib from "../lib/email/email"
import OTPLib from "../lib/otp/otp"
import SMSLib from "../lib/sms/sms"
import VOICELib from "../lib/voice/voice"
import ConfigProvider from "./config"
import Registry from "./driver.registry"
import RegistryBase from "./driver.registry.base"


export class RegistryDefault extends RegistryBase implements Registry {
  c: ConfigProvider
  constructor(c: ConfigProvider) {
    super()
    this.c = c
    const m = new CoreManagerDefault(c)
    m.setSMSManager(SMSLib(c))
    m.setOTPManager(OTPLib(c))
    m.setVoiceManager(VOICELib(c))
    m.setEmailManager(EmailLib(c))
    this.set(this).setConfig(c).setManager(m)
  }
  init(): void {

  }
  handler(): HandlerProvider {
    return super.handler()
  }
  configuration(): ConfigProvider{
    return this.c
  }
  manager(): CoreManager {
    return this.m
  }
}

export default RegistryDefault