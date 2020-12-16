import { SocketHandler } from "../core.socket.handler"
import { Voice } from "./voice";

export default interface VoiceManager extends SocketHandler{
  call(voice: Voice): Promise<void>
}
