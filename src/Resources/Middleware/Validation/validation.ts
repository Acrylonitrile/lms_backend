import { Request, Response, NextFunction } from "express"
import Joi from "joi"
import jwt from "jsonwebtoken"
import { Roles } from "../../Authorization/auth.service"
import db from "../../database"
import { Language } from "../../Language/entity"
import env from "dotenv"
env.config()
export interface IUserDetails {
  id: number
  email: string
  role: Roles
  iat: number
}

export const validateRequest =
  (schema: Joi.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)
    } catch (error: any) {
      return res.status(400).send({
        error: "failed to validate request: " + error.details[0].message
      })
    }
    next()
  }

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("test")
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) throw new Error("no token provided")
    const result = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as IUserDetails
    //console.log(result)
    res.locals = { userData: result }
    next()
    // return res.status(200).send(res.locals)
  } catch (error: any) {
    return res.status(400).send({
      error: "failed to validate token: " + error.message
    })
  }
}
