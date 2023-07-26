import joi from "joi"

export const addNewSequence = joi.object({
  sequence: joi.array().items(joi.number().positive()).required(),
  languageId: joi.number().positive().required()
})

export const getSequence = joi.object({
  languageId: joi.number().positive().required()
})

export const addNewChapter = joi.object({
  chapterId: joi.number().positive().required(),
  languageId: joi.number().positive().required()
})

export const alterSequence = joi.object({
  chapterId: joi.number().positive().required(),
  newIndex: joi.number().positive().allow(0).required(),
  languageId: joi.number().positive().required()
})
