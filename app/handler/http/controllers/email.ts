

import { NextFunction, Request, Response } from "express"
import CoreManager from "../../../core/core.manager"
import { Email } from "../../../core/email"
import ConfigProvider from "../../../driver/config"
export const params = {
  otpKey: 'otp_key'
}
export const getKey = (r: Request): string => r.params[params.otpKey]

export const getDigit = (r: Request): number => r.body.digit || r.body.length

export const getSubject = (r: Request): string => r.body.subject

export const getMessage = (r: Request): string => r.body.message

export const getRecipient = (r: Request): string => r.body.recipient

export const maxAttempt = (r: Request): number => r.body.maxattempt

export const expire = (r: Request): number => r.body.expire

export const getOTPStr = (r: Request): string => r.body.otpstr

const emailController = (c: ConfigProvider, m: CoreManager) => ({
  async emailOtpGenerate(r: Request, w: Response) {
    const otp = await m.otpManager().generate(getKey(r), getDigit(r), expire(r))
    let [
      message,
      subject,
      recipient
    ] = [
      getMessage(r),
      getSubject(r),
      getRecipient(r)
    ]
    message = message.replace('{{otp}}', otp.otp)
    const email: Email = {
      message,
      subject,
      recipient
    }
    c.logger().info({email, otp})
    await m.emailManager().send(email)
    return w.status(201).send(
      {
        "status": 200,
        "message": "success"
      }
    )
  },
  async emailOtpVerify(r: Request, w: Response) {
    const [key, otpStr] = [getKey(r), getOTPStr(r)]
    const otp = await m.otpManager().verify(key, otpStr)
    return w.status(202).send(
      {
        "code": 0,
        "message": "Your OTP is valid",
        "maxattempt": otp.attempt,
        "expire": otp.expire,
        "status": 200
      }
    )
  },
  async errorEmailOTPVerify(err: any, r: Request, w: Response, n: NextFunction) {
    w.status(err.code || 500).send(
      {
        "status": 500,
        "message": "Your OTP is invalid"
      }
    )
  },
})

export default emailController