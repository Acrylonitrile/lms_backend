import joi from "joi"

/**
 * @openapi
 * components:
 *  schemas:
 *   AddLanguage:
 *    type: object
 *    required:
 *    - name
 *    properties:
 *     name:
 *      type: string
 *      default: name
 *   AddLanguageResponse:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     id:
 *      type: integer
 */
export const addLanguage = joi.object({
  name: joi.string().min(5).max(50).required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   AssignMentor:
 *    type: object
 *    required:
 *    - mentorId
 *    properties:
 *     mentorId:
 *      type: integer
 *
 *
 */

export const assignMentor = joi.object({
  languageId: joi.number().positive().required(),
  mentorId: joi.number().positive().required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   GetLanguageResponse:
 *    type: array
 *    items:
 *     type: object
 *     properties:
 *      id:
 *       type: integer
 *      name:
 *       type: string
 */
