import { Router } from "express"
import { validateCredentials } from "../Middleware/Validation/validation"
import { AuthController } from "./auth.controller"
import { loginSchema, signUpSchema } from "./validation.schemas"

const authRouter = Router()
const authController = new AuthController()

authRouter.post(
  "/signup",
  validateCredentials(signUpSchema),
  authController.signUp
)
authRouter.post(
  "/login",
  validateCredentials(loginSchema),
  authController.login
)

export default authRouter
