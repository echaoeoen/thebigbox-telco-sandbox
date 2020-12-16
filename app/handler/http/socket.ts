import {Socket, Server as IOServer, ServerOptions} from 'socket.io'
import {Server} from 'http'
import ConfigProvider from '../../driver/config'
import { HandlerItem } from '../../core/core.socket.handler'
const socket = (c: ConfigProvider, ...handlers: HandlerItem[]) =>  (server: Server, opts?: Partial<ServerOptions>) => {
  const io = new IOServer(server)
  io.on('connection', (socket: Socket) => {
    for (const p in handlers) {
      const element = handlers[p]
      socket.on(element.event, element.handler(socket))
    }
    socket.on('join', (room: string) => {
      c.logger().info({
        socket_id: socket.id,
        room,
        message: 'join-room'
      })
      socket.join(room)
      socket.emit('joined', room)
    })

    socket.on('leave', (room: string) => {
      c.logger().info({
        socket_id: socket.id,
        room,
        message: 'leave-room'
      })
      socket.leave(room)
      socket.emit('leaved', room)
    })
  })

}

export default socket