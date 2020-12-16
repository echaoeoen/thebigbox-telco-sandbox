import SMSManager, { SMS } from "../../core/sms"
import ConfigProvider from '../../driver/config'
import SocketClient from '../socket-client'
import { handlers, SMS_SUCCESS_EVENT } from "./socket.handler"
import {SMS_EVENT} from './socket.handler'
export const SMSLib = (c: ConfigProvider): SMSManager => {
  const validate = (sms: SMS): SMS =>{
    if(sms.msisdn.length < 10) throw new Error(`Invalid MSISDN`)
    sms.sender = sms.sender || c.defaultSender()
    return sms
  }
  const send = async (sms: SMS): Promise<any> => {
    sms = validate(sms)
    const cl = await SocketClient(c, `http://localhost:${c.listenPort()}`)
    cl.join(sms.msisdn)
    await cl.send(SMS_EVENT, {
      msisdn: sms.msisdn,
      message: {
        from: sms.sender,
        message: sms.content
      }
    }, SMS_SUCCESS_EVENT)
  }
  const h = handlers(c)
  return {
    send, validate, handlers: () => h
  }
}
export default SMSLib