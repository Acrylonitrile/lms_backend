import joi from "joi"

export const addLanguage = joi.object({
  name: joi.string().min(5).max(50).required()
})

export const assignMentor = joi.object({
  languageId: joi.number().positive().required(),
  mentorId: joi.number().positive().required()
})
