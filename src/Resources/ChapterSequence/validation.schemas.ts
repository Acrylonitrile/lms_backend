import joi from "joi"

/**
 * @openapi
 * components:
 *  schemas:
 *   AddSequence:
 *    type: object
 *    required:
 *    - sequence
 *    properties:
 *     sequence:
 *      type: array
 *      items:
 *       type: integer
 *   AddSequenceResponse:
 *    type: object
 *    properties:
 *     sequence:
 *      type: array
 *      items:
 *       type: integer
 *     language:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *       name:
 *        type: string
 *     languageId:
 *      type: integer
 */

export const addNewSequence = joi.object({
  sequence: joi.array().items(joi.number().positive()).required(),
  languageId: joi.number().positive().required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   GetSequenceResponse:
 *    type: array
 *    items:
 *     type: integer
 */

export const getSequence = joi.object({
  languageId: joi.number().positive().required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   AddNewChapter:
 *    type: object
 *    required:
 *    - chapterId
 *    properties:
 *     chapterId:
 *      type: integer
 *   AddNewChapterResponse:
 *    type: object
 *    properties:
 *     sequence:
 *      type: array
 *      items:
 *       type: integer
 *     language:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *       name:
 *        type: string
 */

export const addNewChapter = joi.object({
  chapterId: joi.number().positive().required(),
  languageId: joi.number().positive().required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   AlterSequence:
 *    type: object
 *    required:
 *    - chapterId
 *    - newIndex
 *    properties:
 *     chapterId:
 *      type: integer
 *     newIndex:
 *      type: integer
 */

export const alterSequence = joi.object({
  chapterId: joi.number().positive().required(),
  newIndex: joi.number().positive().allow(0).required(),
  languageId: joi.number().positive().required()
})
