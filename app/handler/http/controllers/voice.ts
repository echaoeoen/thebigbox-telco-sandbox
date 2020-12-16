import { NextFunction, Request, Response } from "express"
import CoreManager from "../../../core/core.manager"
import { Voice } from "../../../core/voice"
import ConfigProvider from "../../../driver/config"
export const params = {
  otpKey: 'otp_key'
}
export const getKey = (r: Request): string => r.params[params.otpKey]

export const getDigit = (r: Request): number => r.body.digit || r.body.length

export const getPhoneNum = (r: Request): string => r.body.phoneNum ||r.body.user

export const getRingingDuration = (r: Request): number => r.body.ringing_duration

export const getDuration = (r: Request): number => r.body.duration

export const maxAttempt = (r: Request): number => r.body.max_attempt

export const getOTPStr = (r: Request): string => r.body.otpStr || r.body.password

const voiceController = (c: ConfigProvider, m: CoreManager) => ({
  async voiceOtpGenerate(r: Request, w: Response) {
    const otp = await m.otpManager().generate(getKey(r), getDigit(r), 90)
    const voice: Voice = {
      callee: getPhoneNum(r),
      content: otp.otp
    }
    c.logger().info({voice, otp})
    await m.voiceManager().call(voice)
    return w.status(201).send(
      {
        "id": "key-otp-"+(new Date()).getTime(),
        "subscriber": "",
        "key": getKey(r),
        "caller": "",
        "callee": getPhoneNum(r),
        "status": "pending",
        "call_time": 0,
        "created_at": new Date(),
        "updated_at": new Date()
      }
    )
  },
  async voiceOtpVerify(r: Request, w: Response) {
    const [key, otpStr] = [getKey(r), getOTPStr(r)]
    await m.otpManager().verify(key, otpStr)
    return w.status(202).send(
      {
        "code": 0,
        "message": "Your OTP is valid",
        "maxattempt": "~",
        "expire": 90
      }
    )
  },
  async errorVoiceOTPVerify(err: any, r: Request, w: Response, n: NextFunction) {
    w.status(err.code || 500).send(
      {
        "code": 1,
        "message": err.message,
        "maxattempt": "~",
        "expire": 0
      }
    )
  },
  async MissedCallOtpGenerate(r: Request, w: Response){
    const otp = await m.otpManager().generate(getKey(r), getDigit(r), 90, maxAttempt(r))
    let caller = "02100000000"
    caller = otp.digit > caller.length ? otp.otp : caller.substr(0, caller.length - otp.digit) + otp.otp
    const voice: Voice = {
      callee: getPhoneNum(r),
      caller,
      duration: getDuration(r),
      ringing_duration: getRingingDuration(r),
      content: ''
    }
    c.logger().info({message: 'missed-call', voice, otp})
    await m.voiceManager().call(voice)
    return w.status(201).send(
      {
        "user":  getPhoneNum(r),
        "max_attempt":  maxAttempt(r),
        "duration": getDuration(r),
        "length": getDigit(r),
        "prefix": 1122
      }
    )
  },
  async MissedCallOtpVerify(r: Request, w: Response) {
    const [key, otpStr] = [getKey(r), getOTPStr(r)]
    await m.otpManager().verify(key, otpStr)
    return w.status(202).send(
      {
        "message": "Your OTP is valid",
      }
    )
  }
})

export default voiceController