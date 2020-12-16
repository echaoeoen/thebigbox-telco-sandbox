import OTP from "../../../../core/otp/otp";
import ConfigProvider from "../../../../driver/config";
import { PreconditionError } from "../../../../helper/error";
import RedisClient from "../../../redis";
import OTPStorageProvider from "../provider";

const OTPRedisProvider = (c: ConfigProvider): OTPStorageProvider => {
  const redisClient = new RedisClient(c)
  
  const save = async function save(key: string, otp: OTP): Promise<void> {
      await redisClient.set<OTP>(`${key}`, otp)
    }
   const get = async function get(key: string): Promise<OTP> {
      const otp = await redisClient.get<OTP>(key)
      return otp
    }
    const decrementAttempt = async function decrementAttempt(key: string): Promise<void> {
      let otp = await get(key)
      if(otp.attempt === 0) throw new PreconditionError(`Max attempt reached`)
      otp.attempt = otp.attempt - 1
      await save(key, otp)
    }
    return {
      save, get, decrementAttempt
    }
  
}
export default OTPRedisProvider