import { Router } from "express"
import enrollmentController from "./enrollment.controller"
import { validateCredentials } from "../Middleware/Validation/validation"
import { enrollStudent } from "./enrollment.schema"

const enrollmentRouter = Router()

enrollmentRouter.post(
  "/enrol",
  validateCredentials(enrollStudent),
  enrollmentController.enrollStudent
)
enrollmentRouter.post(
  "/finish",
  validateCredentials(enrollStudent),
  enrollmentController.finishCourse
)

export default enrollmentRouter
