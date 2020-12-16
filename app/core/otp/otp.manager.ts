import OTP from "./otp";


export interface OTPManager {
  generate(key: string, digit: number, expires?: number, maxAttempt?: number): Promise<OTP>
  verify(key: string, otp: string): Promise<OTP>
}

export default OTPManager