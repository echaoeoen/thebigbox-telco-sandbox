import EmailManager, { Email } from "../../core/email"
import ConfigProvider from '../../driver/config'
import SocketClient from '../socket-client'
import { handlers, EMAIL_SUCCESS_EVENT } from "./socket.handler"
import {EMAIL_EVENT} from './socket.handler'
export const EmailLib = (c: ConfigProvider): EmailManager => {
  const validate = (email: Email): Email =>{
    return email
  }
  const send = async (email: Email): Promise<any> => {
    email = validate(email)
    const cl = await SocketClient(c, `http://localhost:${c.listenPort()}`)
    cl.join(email.recipient)
    await cl.send(EMAIL_EVENT, email, EMAIL_SUCCESS_EVENT)
  }
  const h = handlers(c)
  return {
    send, validate, handlers: () => h
  }
}
export default EmailLib