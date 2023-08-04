import { Router } from "express"
import sequenceController from "./sequence.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import {
  addNewChapter,
  addNewSequence,
  alterSequence,
  getSequence
} from "./validation.schemas"
import sequenceValidation from "./sequence.validation"
import {
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  excludeRole
} from "../Middleware/Validation/privilegeChecks"
import verifyParam from "../Middleware/Validation/checkParams"

const sequenceRouter = Router()

/**
 * @openapi
 * '/sequence/{languageId}':
 *  post:
 *   summary: Add new chapter sequence
 *   tags:
 *    - Chapter Sequence
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
 *       $ref: '#/components/schemas/AddSequence'
 *   responses:
 *    201:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/AddSequenceResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

sequenceRouter.post(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(addNewSequence),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  sequenceValidation.validateNewSequence,
  sequenceController.addSequence
)

/**
 * @openapi
 * '/sequence/{languageId}':
 *  put:
 *   summary: Add new chapter to existing sequence
 *   tags:
 *    - Chapter Sequence
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
 *       $ref: '#/components/schemas/AddNewChapter'
 *   responses:
 *    201:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/AddNewChapterResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

sequenceRouter.put(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(addNewChapter),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  sequenceValidation.validateNewChapter,
  sequenceController.addNewChapter
)

/**
 * @openapi
 * '/sequence/{languageId}':
 *  get:
 *   summary: get chapter sequence under given language Id
 *   tags:
 *    - Chapter Sequence
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
 *        $ref: '#/components/schemas/GetSequenceResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

sequenceRouter.get(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(getSequence),
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  sequenceController.getSequence
)

/**
 * @openapi
 * '/sequence/alter/{languageId}':
 *  put:
 *   summary: Alter the position of a chapter in existing sequence
 *   tags:
 *    - Chapter Sequence
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
 *       $ref: '#/components/schemas/AlterSequence'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetSequenceResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

sequenceRouter.put(
  "/alter/:languageId",
  verifyParam("languageId"),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  validateRequest(alterSequence),
  sequenceController.alterSequence
)

export default sequenceRouter
