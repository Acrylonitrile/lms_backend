import joi from "joi"

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
