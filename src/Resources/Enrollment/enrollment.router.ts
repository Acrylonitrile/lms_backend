import { Router } from "express"
import enrollmentController from "./enrollment.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { enrollStudent } from "./enrollment.schema"

const enrollmentRouter = Router()

enrollmentRouter.post(
  "/enrol",
  validateRequest(enrollStudent),
  enrollmentController.enrollStudent
)
enrollmentRouter.post(
  "/finish",
  validateRequest(enrollStudent),
  enrollmentController.finishCourse
)

export default enrollmentRouter
