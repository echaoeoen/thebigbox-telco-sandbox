import OTP from "../../core/otp/otp";
import OTPManager from "../../core/otp/otp.manager";
import ConfigProvider from "../../driver/config";
import { PreconditionError } from "../../helper/error";
import OTPInMemoryProvider from "./storage/in-memory";
import OTPStorageProvider from "./storage/provider";
import OTPRedisProvider from "./storage/redis";

const OTPLib = (c: ConfigProvider): OTPManager => {

  const storageProvider: OTPStorageProvider = c.DBProtocol() === 'redis' ? OTPRedisProvider(c) : OTPInMemoryProvider(c)
  const generate = async (key: string, digit: number, expire?: number, maxAttempt?: number): Promise<OTP> => {
    digit = digit || 6
    expire = expire || 60
    maxAttempt = maxAttempt || 3
    const generated = (new Date()).getTime().toString()
    if(digit > generated.length) {
      throw new PreconditionError(`Error: digit is more than maximum (${generated.length}) `)
    }
    const c = generated.substr(generated.length - digit, digit)
    const otp: OTP = {
      created: new Date(),
      digit,
      expire,
      otp: c,
      attempt: maxAttempt,
      key: key
    }
    await storageProvider.save(key, otp)
    return otp
  }
  const verify = async (key: string, code: string): Promise<OTP> => {
    const dataOTP = await storageProvider.get(key)
    let { created, expire, otp  } = dataOTP
    const now = (new Date()).getTime()
    created = new Date(created)
    if((now - created.getTime()) / 1000 > expire  ) throw new PreconditionError(`OTP expired`)
    if(otp !== code) {
      await storageProvider.decrementAttempt(key)
      throw new PreconditionError(`OTP is invalid`)
    }
    return dataOTP
  }
  return {
    generate,
    verify
  }
}

export default OTPLib