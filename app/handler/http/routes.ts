import { Router } from "express"
import CoreManager from "../../core/core.manager"
import ConfigProvider from "../../driver/config"
import smsController  from './controllers/sms'
export const router = (c: ConfigProvider, m: CoreManager) => {
  const r = Router()
  const smsCtrl = smsController(c, m)
  r.post(`/message`, smsCtrl.sendSMS)
  return r
}

export default router