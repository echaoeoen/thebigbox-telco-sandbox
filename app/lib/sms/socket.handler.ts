import { Socket } from "socket.io"
import { SMS } from "../../core/sms"
import { HandlerItem } from "../../core/core.socket.handler"
import ConfigProvider from "../../driver/config"

export const SMS_EVENT = 'message'
export const SMS_SUCCESS_EVENT = `messagesent`

export const handlers =(c: ConfigProvider): HandlerItem[] => [
  {
    event: SMS_EVENT,
    handler: (socket: Socket) => (sms: SMS) => {
      c.logger().info({message: 'new-messaging', sms})
      socket.to(sms.msisdn).emit(SMS_EVENT, sms)
      socket.emit(SMS_SUCCESS_EVENT, '')
    }
  }
]