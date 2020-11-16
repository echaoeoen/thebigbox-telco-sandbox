import { Socket } from "socket.io";
export interface SocketListener {
  (...args: any[]): void
}
export interface HandlerItem {
  event: string
  handler(socket: Socket): SocketListener
}

export interface SocketHandler{
  handlers(): HandlerItem[]
}