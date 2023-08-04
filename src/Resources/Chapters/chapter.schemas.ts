import joi, { string } from "joi"

/**
 * @openapi
 * components:
 *  schemas:
 *   AddChapters:
 *    type: object
 *    required:
 *    - chapterList
 *    - languageId
 *    properties:
 *     chapterList:
 *      type: array
 *      items:
 *       type: string
 *       default: new chapter
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *   AddChaptersResponse:
 *    type: array
 *    items:
 *     type: object
 *     properties:
 *      name:
 *       type: string
 *      language:
 *       type: array
 *       items:
 *        type: object
 *        properties:
 *         id:
 *          type: integer
 *         name:
 *          type: string
 *      id:
 *       type: integer
 */

export const addChapters = joi.object({
  chapterList: joi.array().items(joi.string().min(5)).required(),
  languageId: joi.number().positive().required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *
 *   GetChaptersResponse:
 *    type: array
 *    items:
 *     type: object
 *     properties:
 *      id:
 *       type: integer
 *      name:
 *       type: string
 */

export const getChapters = joi.object({
  languageId: joi.number().positive().required()
})
