import { Socket } from "socket.io"
import { HandlerItem } from "../../core/core.socket.handler"
import { Voice } from "../../core/voice"
import ConfigProvider from "../../driver/config"

export const VOICE_EVENT = 'voice'
export const VOICE_SUCCESS_EVENT = `voice-success`

export const handlers =(c: ConfigProvider): HandlerItem[] => [
  {
    event: VOICE_EVENT,
    handler: (socket: Socket) => (voice: Voice) => {
      c.logger().info({message: 'new-voice', voice})
      socket.to(voice.callee).emit(VOICE_EVENT, voice)
      socket.emit(VOICE_SUCCESS_EVENT, '')
    }
  }
]