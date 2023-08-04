import { Router } from "express"
import { validateRequest } from "../Middleware/Validation/validation"
import { AuthController } from "./auth.controller"
import { loginSchema, signUpSchema } from "./validation.schemas"

const authRouter = Router()
const authController = new AuthController()

/**
 * @openapi
 * /auth/signup:
 *  post:
 *   tags:
 *    - Authorization
 *   summary: Signup as new user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SignUpSchema'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ChangeValueResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 *
 */
authRouter.post("/signup", validateRequest(signUpSchema), authController.signUp)

/**
 * @openapi
 * /auth/login:
 *  post:
 *   tags:
 *    - Authorization
 *   summary: Login as existing user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/LoginSchema'
 *   responses:
 *    200:
 *     description: Succesful Login
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/LoginResponse'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post("/login", validateRequest(loginSchema), authController.login)

export default authRouter
