import SMSManager from "./sms";

export interface CoreManager {
  smsManager(): SMSManager
  setSMSManager(smsManager: SMSManager): void
}

export default CoreManager