import VoiceManager, { Voice } from "../../core/voice"
import ConfigProvider from '../../driver/config'
import SocketClient from '../socket-client'
import { handlers, VOICE_SUCCESS_EVENT } from "./socket.handler"
import {VOICE_EVENT} from './socket.handler'
export const VOICELib = (c: ConfigProvider): VoiceManager => {
  const call = async (voice: Voice): Promise<any> => {
    const cl = await SocketClient(c, `http://localhost:${c.listenPort()}`)
    cl.join(voice.callee)
    await cl.send(VOICE_EVENT, {
      ...voice
    }, VOICE_SUCCESS_EVENT)
  }
  const h = handlers(c)
  return {
    call, handlers: () => h
  }
}
export default VOICELib