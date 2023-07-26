import { Request, Response, NextFunction } from "express"
import Joi from "joi"

export const validateCredentials =
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
