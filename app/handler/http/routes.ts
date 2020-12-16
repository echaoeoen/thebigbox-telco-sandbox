import { Router } from "express"
import CoreManager from "../../core/core.manager"
import ConfigProvider from "../../driver/config"

import smsController  from './controllers/sms'

import emailController, {params as emailParam }  from './controllers/email'

import voiceController, {params as voiceParam } from './controllers/voice'
export const router = (c: ConfigProvider, m: CoreManager) => {
  const r = Router()
  const smsCtrl = smsController(c, m)
  const voiceCtrl = voiceController(c, m)
  const emailCtrl = emailController(c, m)
  
  r.post(`/sms/v2/reg/sendsms.json`, smsCtrl.sendSMS)
  
  r.put(`/voiceotp/otp/:${voiceParam.otpKey}`, voiceCtrl.voiceOtpGenerate)
  r.post(`/voiceotp/otp/:${voiceParam.otpKey}/verifications`, voiceCtrl.voiceOtpVerify)
  r.use(`/voiceotp/otp/:${voiceParam.otpKey}/verifications`, voiceCtrl.errorVoiceOTPVerify)
  
  r.put(`/vericall/otp/:${voiceParam.otpKey}`, voiceCtrl.MissedCallOtpGenerate)
  r.post(`/vericall/otp/:${voiceParam.otpKey}/validation`, voiceCtrl.MissedCallOtpVerify)

  r.put(`/emailotp/send/:${emailParam.otpKey}`, emailCtrl.emailOtpGenerate)
  r.post(`/emailotp/verify/:${emailParam.otpKey}`, emailCtrl.emailOtpVerify)
  r.use(`/emailotp/send/:${emailParam.otpKey}`, emailCtrl.errorEmailOTPVerify)
  
  return r
}

export default router