import { NextFunction, Request, Response } from "express";
import ConfigProvider from "../../../driver/config";

const ErrorMiddelware = (c: ConfigProvider) => (err: any, r: Request, w: Response, n: NextFunction ) => {
  const {
    message, stack
  } = err
  c.logger().error({message, stack, err})
  w.status(err.code || 500).send({message})
}

export default ErrorMiddelware