export interface OTP {
  key: string
  otp: string
  digit: number
  expire: number
  created: Date,
  attempt: number
}

export default OTP