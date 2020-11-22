import IO from 'socket.io-client'
const socket = IO(window.origin)
export const useSocket = () => {
  const on = socket.on
  const emit = socket.emit
  return { on, emit }  
}

