import OTP from "../../../../core/otp/otp";
import ConfigProvider from "../../../../driver/config";
import { PreconditionError } from "../../../../helper/error";
import OTPStorageProvider from "../provider";
type DBObject = {
  [key: string]: any
}

let DB: DBObject = {}

const OTPInMemoryProvider = (c: ConfigProvider): OTPStorageProvider => {
  
  const save = async function save(key: string, otp: OTP): Promise<void> {
      DB[key] = otp
    }
   const get = async function get(key: string): Promise<OTP> {
      const otp = DB[key]
      if(!otp) new Error(`No OTP data`) 
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
export default OTPInMemoryProvider