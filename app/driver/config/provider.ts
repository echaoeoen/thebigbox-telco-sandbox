import config from 'config'
import pino, { BaseLogger } from 'pino'
import { URL } from 'url'
import { ConfigProvider } from './config'

export const [
  keyListenPort,
  keyListenHost,
  keyDefaultSender,
  keyDSN,

  appName
] = [
  'listen.port',
  'listen.host',
  'default.sender',
  'dsn',

  'Telco-API-Sandbox'
]

function newLogger(): BaseLogger {
  return pino({
    name: appName,
    // level: process.env.NODE_ENV === 'development' ? 'warn' : 'info',
    timestamp: () => `,"time":"${new Date().toISOString()}"`
  })
}

export class Config implements ConfigProvider {
 
  l?: BaseLogger = undefined
  
  listenHost(): string {
    return config.get(keyListenHost)
  }
  listenPort(): number {
    return config.get(keyListenPort)
  }
  logger(): BaseLogger {
    if(!this.l) this.l = newLogger()
    return this.l
  }
  appName(): string {
    return appName
  }
  DSN(): string {
    return config.get(keyDSN)
  }
  defaultSender(): string {
    return config.get(keyDefaultSender)
  }
  DBProtocol(): string {
    const p = new URL(this.DSN())
    return p.protocol.replace(":", "")
  }
}

export default ConfigProvider