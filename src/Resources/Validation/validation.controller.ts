import { Request, Response, NextFunction } from "express"
import { ValidationService } from "./validation.service"

const validationService = new ValidationService()

export class ValidationController {
  validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, first_name, last_name, role } = req.body
    try {
      validationService.validateSignup(
        email,
        password,
        first_name,
        last_name,
        role
      )
    } catch (error) {
      return res.status(400).send(error)
    }
    next()
  }
  validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body
    try {
      validationService.validateLogin(email, password, role)
    } catch (error) {
      return res.status(400).send(error)
    }
    next()
  }
}
