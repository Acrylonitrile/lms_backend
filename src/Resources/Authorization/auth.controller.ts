import { AuthService, Roles } from "./auth.service"
import { Request, Response } from "express"

interface ILoginDetails {
  email: string
  password: string
  role: Roles
}

interface ISignupDetails extends ILoginDetails {
  first_name: string
  last_name: string
}

export class AuthController {
  signUp = async (req: Request, res: Response) => {
    const { email, password, first_name, last_name, role } =
      req.body as ISignupDetails
    const authService = new AuthService(role)
    try {
      const result = await authService.signUp(
        email,
        password,
        first_name,
        last_name
      )
      return res.status(201).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  login = async (req: Request, res: Response) => {
    const { email, password, role } = req.body as ILoginDetails
    const authService = new AuthService(role)
    try {
      const result = await authService.login(email, password)
      setTimeout(() => {
        return res.status(200).send(result)
      }, 5000)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
}
