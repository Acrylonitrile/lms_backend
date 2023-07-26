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

const sequenceRouter = Router()

sequenceRouter.post(
  "/add",
  validateRequest(addNewSequence),
  sequenceValidation.validateNewSequence,
  sequenceController.addSequence
)
sequenceRouter.post(
  "/addchapter",
  validateRequest(addNewChapter),
  sequenceValidation.validateNewChapter,
  sequenceController.addNewChapter
)
sequenceRouter.put(
  "/",
  validateRequest(getSequence),
  sequenceController.getSequence
)
sequenceRouter.post(
  "/alter",
  validateRequest(alterSequence),
  sequenceController.alterSequence
)

export default sequenceRouter
