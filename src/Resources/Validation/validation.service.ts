import { signUpSchema, loginSchema } from "./validation.schemas"
import { Roles } from "../Authorization/auth.service"

export class ValidationService {
  validateSignup = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    role: Roles
  ) => {
    try {
      await signUpSchema.validateAsync({
        email,
        password,
        first_name,
        last_name,
        role
      })
      return
    } catch (error: any) {
      throw new Error("failed to validate input: " + error.details[0].message)
    }
  }
  validateLogin = async (email: string, password: string, role: Roles) => {
    try {
      await loginSchema.validateAsync({ email, password, role })
      return
    } catch (error: any) {
      throw new Error("failed to validate input: " + error.details[0].message)
    }
  }
}
