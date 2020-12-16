import { Socket } from "socket.io"
import { Email } from "../../core/email"
import { HandlerItem } from "../../core/core.socket.handler"
import ConfigProvider from "../../driver/config"

export const EMAIL_EVENT = 'email'
export const EMAIL_SUCCESS_EVENT = `emailsend`

export const handlers =(c: ConfigProvider): HandlerItem[] => [
  {
    event: EMAIL_EVENT,
    handler: (socket: Socket) => (email: Email) => {
      c.logger().info({message: 'new-email', email})
      socket.to(email.recipient).emit(EMAIL_EVENT, email)
      socket.emit(EMAIL_SUCCESS_EVENT, '')
    }
  }
]