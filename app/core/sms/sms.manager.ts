import { SocketHandler } from "../core.socket.handler"
import { SMS } from "./sms"

export default interface SMSManager extends SocketHandler{
  send(sms: SMS): Promise<void>
  validate(sms: SMS): SMS
}
