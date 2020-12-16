import redis, {RedisClient as RedisCl} from 'redis'
import { promisify } from 'util';
import ConfigProvider from '../../driver/config';

class RedisClient {
  _config: ConfigProvider
  _client: RedisCl
  _get: any
  _set: any
  _del: any
  constructor(c: ConfigProvider) {
    this._config = c
    this._client = redis.createClient({
      url: c.DSN()
    })
    this._get = promisify(this._client.hgetall).bind(this._client)
    this._del = promisify(this._client.hdel).bind(this._client)
    this._set = promisify(this._client.hmset).bind(this._client)
  }
  async get<T>(key: string): Promise<T> {
    const ret = await this._get(key)
    return ret
  }
  async set<T>(key: string, data: T): Promise<T> {
    await this._set(key, data)
    return data
  }
  async delete(key: string): Promise<void> {
    await this._del(key)
  }
}

export default RedisClient