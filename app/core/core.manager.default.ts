import ConfigProvider from "../driver/config"
import CoreManager from "./core.manager"
import SMSManager from "./sms"

export default class CoreManagerDefault implements CoreManager {
  _smsManager: SMSManager
  c: ConfigProvider
  constructor(c: ConfigProvider){
    this.c = c
  }
  setSMSManager(smsManager: SMSManager): void {
    this._smsManager = smsManager
  }
  smsManager(): SMSManager {
    return this._smsManager
  }
} 