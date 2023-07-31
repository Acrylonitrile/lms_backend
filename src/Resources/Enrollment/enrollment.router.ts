import { Router } from "express"
import enrollmentController from "./enrollment.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { enrollStudent } from "./enrollment.schema"
import {
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  excludeRole
} from "../Middleware/Validation/privilegeChecks"

const enrollmentRouter = Router()

enrollmentRouter.post(
  "/enrol",
  validateRequest(enrollStudent),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  enrollmentController.enrollStudent
)
enrollmentRouter.post(
  "/finish",
  validateRequest(enrollStudent),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  enrollmentController.finishCourse
)

export default enrollmentRouter
