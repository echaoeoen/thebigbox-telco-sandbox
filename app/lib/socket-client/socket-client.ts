import IOClient from 'socket.io-client'
import ConfigProvider from '../../driver/config'

export interface SocketClient {
  join (room: string): void
  send (event: string, message: object, successEvent?: string): Promise<void>
  disconnect (): void
}
const socketClient = (c: ConfigProvider, host: string): Promise<SocketClient> => {
  return new Promise((resolve, reject) => {
    const client = IOClient(host)
    const join = (room: string) => {
      client.emit('join', room)
    }
    const send = (event: string, message: object, successEvent?: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        client.emit(event, message)
        if(successEvent) {    
          client.on(successEvent, () => {
            client.disconnect()
            resolve()
          })
        } else resolve()
      })
    }
    const disconnect = () => {
      client.disconnect()
    }

    client.on(`connect`, () => {
      c.logger().info(`connecting to socket`)
      resolve({
        join,
        send,
        disconnect
      })
    })
    
    client.on(`connected`, () => {
      c.logger().info(`connected to socket`)
      resolve({
        join,
        send,
        disconnect
      })
    })

    client.on(`connect_timeout`, () => {
      c.logger().info(`connect timeout`)
      reject(new Error(`Connection timeout`))
    })
    client.on('error', () => {
      c.logger().info(`error connect`)
      reject(new Error(`Connection timeout`))
    })
    client.on('ping', () => {
      c.logger().info(`pinging`)
    })
    client.on('pong', () => {
      c.logger().info(`pongin`)
    })
  })
}

export default socketClient