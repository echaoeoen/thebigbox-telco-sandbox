import EmailManager from "./email"
import OTPManager from "./otp/otp.manager"
import SMSManager from "./sms"
import VoiceManager from "./voice"

export interface CoreManager {
  smsManager(): SMSManager
  setSMSManager(smsManager: SMSManager): void

  voiceManager(): VoiceManager
  setVoiceManager(voiceManager: VoiceManager): void

  otpManager(): OTPManager
  setOTPManager(otpManager: OTPManager): void

  emailManager(): EmailManager
  setEmailManager(emailManager: EmailManager): void
}

export default CoreManager