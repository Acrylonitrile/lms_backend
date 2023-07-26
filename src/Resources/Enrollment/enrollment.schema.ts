import joi from "joi"

export const enrollStudent = joi.object({
  fresherId: joi.number().positive().required(),
  languageId: joi.number().positive().required()
})
