import ConfigProvider from "../driver/config"
import CoreManager from "./core.manager"
import EmailManager from "./email"
import OTPManager from "./otp/otp.manager"
import SMSManager from "./sms"
import VoiceManager from "./voice"

export default class CoreManagerDefault implements CoreManager {
  _smsManager: SMSManager
  _otpManager: OTPManager
  _voiceManager: VoiceManager
  _emailManager: EmailManager
  c: ConfigProvider
  constructor(c: ConfigProvider){
    this.c = c
  }
  voiceManager(): VoiceManager {
    return this._voiceManager
  }
  setVoiceManager(voiceManager: VoiceManager): void {
    this._voiceManager = voiceManager
  }
  otpManager(): OTPManager {
    return this._otpManager
  }
  setOTPManager(otpManager: OTPManager): void {
    this._otpManager = otpManager
  }
  setSMSManager(smsManager: SMSManager): void {
    this._smsManager = smsManager
  }
  smsManager(): SMSManager {
    return this._smsManager
  }
  setEmailManager(smsManager: EmailManager): void {
    this._emailManager = smsManager
  }
  emailManager(): EmailManager {
    return this._emailManager
  }
} 