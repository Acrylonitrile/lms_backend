import { Router } from "express"
import { ValidationController } from "../Validation/validation.controller"
import { AuthController } from "./auth.controller"

const authRouter = Router()
const validationController = new ValidationController()
const authController = new AuthController()

authRouter.post(
  "/signup",
  validationController.validateSignup,
  authController.signUp
)
authRouter.post(
  "/login",
  validationController.validateLogin,
  authController.login
)

export default authRouter
