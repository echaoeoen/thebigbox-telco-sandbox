import { SocketHandler } from "../core.socket.handler"
import { Email } from "./email"

export default interface EmailManager extends SocketHandler{
  send(email: Email): Promise<void>
  validate(email: Email): Email
}
