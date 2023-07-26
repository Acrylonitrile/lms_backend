import joi, { string } from "joi"

export const addChapters = joi.object({
  chapterList: joi.array().items(joi.string().min(5)).required(),
  languageId: joi.number().positive().required()
})

export const getChapters = joi.object({
  languageId: joi.number().positive().required()
})
