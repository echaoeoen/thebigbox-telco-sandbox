import OTP from "../../../core/otp/otp";

export interface OTPStorageProvider {
  save(key: string, otp: OTP): Promise<void>
  get(key: string): Promise<OTP>
  decrementAttempt(key: string): Promise<void>
}

export default OTPStorageProvider