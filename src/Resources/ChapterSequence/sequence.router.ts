import { Router } from "express"
import sequenceController from "./sequence.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import {
  addNewChapter,
  addNewSequence,
  alterSequence,
  getSequence
} from "./validation.schema"
import sequenceValidation from "./sequence.validation"
import {
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  excludeRole
} from "../Middleware/Validation/privilegeChecks"

const sequenceRouter = Router()

sequenceRouter.post(
  "/add",
  validateRequest(addNewSequence),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  sequenceValidation.validateNewSequence,
  sequenceController.addSequence
)
sequenceRouter.post(
  "/addchapter",
  validateRequest(addNewChapter),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  sequenceValidation.validateNewChapter,
  sequenceController.addNewChapter
)
sequenceRouter.put(
  "/",
  validateRequest(getSequence),
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  sequenceController.getSequence
)
sequenceRouter.post(
  "/alter",
  excludeRole("fresher"),
  checkEnrollmentMentor,
  validateRequest(alterSequence),
  sequenceController.alterSequence
)

export default sequenceRouter
