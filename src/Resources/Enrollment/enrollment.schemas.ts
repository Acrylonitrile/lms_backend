import joi from "joi"

/**
 * @openapi
 * components:
 *  schemas:
 *   EnrolStudent:
 *    type: object
 *    required:
 *    - fresherId
 *    properties:
 *     fresherId:
 *      type: integer
 *      default: 1
 */

export const enrollStudent = joi.object({
  fresherId: joi.number().positive().required(),
  languageId: joi.number().positive().required()
})

/**
 * @openapi
 * components:
 *  schemas:
 *   EnrolStudentResponse:
 *    type: object
 *    properties:
 *     fresher:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *       email:
 *        type: string
 *        default: example@tls.com
 *       first_name:
 *        type: string
 *       last_name:
 *        type: string
 *       training_status:
 *        type: string
 *        enum: [ongoing,completed]
 *     language:
 *      type: object
 *      properties:
 *       id:
 *        type: integer
 *       name:
 *        type: string
 *     fresherId:
 *      type: integer
 *     languageId:
 *      type: integer
 *     date_completed:
 *      type: string
 *     date_start:
 *      type: string
 */
