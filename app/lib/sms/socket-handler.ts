import { Socket } from "socket.io"
import { SMS } from "../../core/sms"
import { HandlerItem, SocketListener } from "../../core/core.socket.handler"
import ConfigProvider from "../../driver/config"

const JOIN_SMS_EVENT = 'join'
const JOINED_SMS_EVENT = 'joined'

const SMS_EVENT = 'message'
const SMS_SUCCESS_EVENT = `messagesent`

export const handlers =(c: ConfigProvider): HandlerItem[] => [
  {
    event: JOIN_SMS_EVENT,
    handler: (socket: Socket): SocketListener => (room: string) => {
      c.logger().info({
        socket_id: socket.id,
        room,
        message: 'join-room'
      })
      for (const room in socket.rooms) {
        socket.leave(room)
      }
      socket.join(room)
      socket.emit(JOINED_SMS_EVENT, 'joined')
    }
  },
  {
    event: SMS_EVENT,
    handler: (socket: Socket) => (sms: SMS) => {
      socket.to(sms.msisdn).emit(SMS_EVENT, sms)
      socket.emit(SMS_SUCCESS_EVENT, '')
    }
  }
]