import { Router } from "express"
import enrollmentController from "./enrollment.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { enrollStudent } from "./enrollment.schemas"
import {
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  excludeRole
} from "../Middleware/Validation/privilegeChecks"
import verifyParam from "../Middleware/Validation/checkParams"

const enrollmentRouter = Router()

/**
 * @openapi
 * '/enrollment/{languageId}':
 *  post:
 *   tags:
 *    - Enrollment
 *   summary: Enrol a new student in language
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
 *       $ref: '#/components/schemas/EnrolStudent'
 *   responses:
 *    201:
 *     description: Successfully enrolled new user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/EnrolStudentResponse'
 *    400:
 *     description: Bad Request
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorResponse'
 */

enrollmentRouter.post(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(enrollStudent),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  enrollmentController.enrollStudent
)

/**
 * @openapi
 * '/enrollment/{languageId}':
 *  put:
 *   tags:
 *    - Enrollment
 *   summary: Set a language as completed for a fresher
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
 *       $ref: '#/components/schemas/EnrolStudent'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ChangeValueResponse'
 */
enrollmentRouter.put(
  "/:languageId",
  verifyParam("languageId"),
  validateRequest(enrollStudent),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  enrollmentController.finishCourse
)

export default enrollmentRouter
