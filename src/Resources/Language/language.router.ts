import { Router } from "express"
import { LanguageController } from "./language.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { addLanguage, assignMentor } from "./validation.schemas"
import { excludeRole } from "../Middleware/Validation/privilegeChecks"
import verifyParam from "../Middleware/Validation/checkParams"

const languageRouter = Router()
const languageController = new LanguageController()

/**
 * @openapi
 * '/language/':
 *  post:
 *   summary : Add a new language
 *   tags:
 *    - Language
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/AddLanguage'
 *   responses:
 *    201:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/AddLanguageResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 *
 */
languageRouter.post(
  "/",
  validateRequest(addLanguage),
  excludeRole("fresher"),
  excludeRole("mentor"),
  languageController.addLanguage
)

/**
 * @openapi
 * '/language/{languageId}':
 *  put:
 *   summary: Assign Mentor to a language
 *   tags:
 *    - Language
 *   parameters:
 *    - in: path
 *      name: languageId
 *      schema:
 *       type: integer
 *       default: 1
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/AssignMentor'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ChangeValueResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 *
 */
languageRouter.put(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(assignMentor),
  excludeRole("fresher"),
  excludeRole("mentor"),
  languageController.assignMentor
)

/**
 * @openapi
 * '/language/':
 *  get:
 *   summary: Get list of languages. Gives list of enrolled languages only for freshers and mentors
 *   tags:
 *    - Language
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetLanguageResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

languageRouter.get("/", languageController.getAllLanguages)

export default languageRouter
