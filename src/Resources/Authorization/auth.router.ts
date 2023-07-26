import { Router } from "express"
import { validateRequest } from "../Middleware/Validation/validation"
import { AuthController } from "./auth.controller"
import { loginSchema, signUpSchema } from "./validation.schemas"

const authRouter = Router()
const authController = new AuthController()

authRouter.post("/signup", validateRequest(signUpSchema), authController.signUp)
authRouter.post("/login", validateRequest(loginSchema), authController.login)

export default authRouter
