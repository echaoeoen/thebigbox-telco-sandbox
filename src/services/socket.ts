import io from 'socket.io-client'
class Socket {
  client: SocketIOClient.Socket
  connected = false
  rooms: string[] = []
  connect(endpoint?: string){
    this.client = io(endpoint || window.origin)
    this.client.on('connect', () => {
      for (let i = 0; i < this.rooms.length; i++) {
        const element = this.rooms[i];
        this.client.emit('join', element)
      }
    
      this.connected = true
    })
    this.client.on('reconnect', () => {
      for (let i = 0; i < this.rooms.length; i++) {
        const element = this.rooms[i];
        this.client.emit('join', element)
      }
    })
  }
  on(event: string, fn: Function): SocketIOClient.Emitter{
    return this.client.on(event, fn)
  }
  emit(event: string, data: any): SocketIOClient.Socket{
    return this.client.emit(event, data)
  }
  join(room: string): SocketIOClient.Socket{
    this.rooms.push(room)
    return this.client.emit('join', room)
  }
}

const socket = new Socket()
export const useSocket = () => {
  if(!socket.client) socket.connect()
  socket.client.on('disconnect', () => console.log('disconnect'))
  socket.client.on('disconnected', () => console.log('disconnected'))
  return socket  
}

