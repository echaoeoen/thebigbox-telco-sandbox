import IO, {Socket} from 'socket.io'
import {Server} from 'http'
import ConfigProvider from '../../driver/config';
import { HandlerItem } from '../../core/core.socket.handler';
const socket = (c: ConfigProvider, ...handlers: HandlerItem[]) =>  (server: Server) => {
  const io = new IO.Server(server);
  io.on('connection', (socket: Socket) => {
    for (const p in handlers) {
      const element = handlers[p];
      socket.on(element.event, element.handler(socket))
    }
  });
}

export default socket