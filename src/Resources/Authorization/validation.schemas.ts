import joi from "joi"

/**
 * @openapi
 * components:
 *  schemas:
 *   SignUpSchema:
 *    type: object
 *    required:
 *    - email
 *    - password
 *    - first_name
 *    - last_name
 *    - role
 *    properties:
 *     email:
 *      type: string
 *      default: admin@tls.com
 *     password:
 *      type: string
 *      default: adminpassword
 *     first_name:
 *      type: string
 *      default: admin
 *     last_name:
 *      type: string
 *      default: user
 *     role:
 *      type: string
 *      default: "admin"
 */
export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  first_name: joi.string().min(1).required(),
  last_name: joi.string().min(1).required(),
  role: joi.string().valid("admin", "mentor", "fresher").required()
})

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().valid("admin", "mentor", "fresher").required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   LoginSchema:
 *    type: object
 *    required:
 *    - email
 *    - password
 *    - role
 *    properties:
 *     email:
 *      type: string
 *      default: admin@tls.com
 *     password:
 *      type: string
 *      default: adminpassword
 *     role:
 *      type: string
 *      default: admin
 *
 *   LoginResponse:
 *    type: object
 *    properties:
 *     Authorization:
 *      type: string
 *      default: Access token
 */
