import { Request, Response } from "express"
import CoreManager from "../../../core/core.manager"
import { SMS } from "../../../core/sms"
import ConfigProvider from "../../../driver/config"

export const smsParam = {

}

export const getSMSBody = (r: Request): SMS => {
  return {
    content: r.body.message || r.body.content,
    msisdn: r.body.msisdn,
    sender: r.body.sender
  }
}
export const smsController = (c: ConfigProvider, m: CoreManager) => ({
  async sendSMS(r: Request, w: Response) {
    const sms = getSMSBody(r)
    await m.smsManager().send(sms)
    c.logger().info(`success send sms`, sms)
    w.status(201).send({
      msgId: (new Date()).getTime(),
      status: true,
      message: 'Your message has been sent.'
    })
  }
}) 
export default smsController