import { Router } from "express"
import { ChapterController } from "./chapter.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { addChapters, getChapters } from "./chapter.schemas"
import {
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  excludeRole
} from "../Middleware/Validation/privilegeChecks"
import verifyParam from "../Middleware/Validation/checkParams"

const chapterRouter = Router()
const chapterController = new ChapterController()

/**
 * @openapi
 * '/chapters/{languageId}':
 *  post:
 *   tags:
 *    - Chapters
 *   summary: Add new chapters
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
 *       $ref: '#/components/schemas/AddChapters'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/AddChaptersResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */
chapterRouter.post(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(addChapters),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  chapterController.addChapters
)

/**
 * @openapi
 * /chapters/{languageId}:
 *  get:
 *   tags:
 *    - Chapters
 *   summary: Get list of chapter under a given language
 *   parameters:
 *    - in: path
 *      name: languageId
 *      schema:
 *       type: integer
 *       default: 1
 *      required: true
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetChaptersResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

chapterRouter.get(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(getChapters),
  checkEnrollmentMentor,
  checkEnrollmentFresher,
  chapterController.getChapters
)

export default chapterRouter
