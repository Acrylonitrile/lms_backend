import { Router } from "express"
import sequenceController from "./sequence.controller"
import { validateCredentials } from "../Middleware/Validation/validation"
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
  validateCredentials(addNewSequence),
  sequenceValidation.validateNewSequence,
  sequenceController.addSequence
)
sequenceRouter.post(
  "/addchapter",
  validateCredentials(addNewChapter),
  sequenceValidation.validateNewChapter,
  sequenceController.addNewChapter
)
sequenceRouter.put(
  "/",
  validateCredentials(getSequence),
  sequenceController.getSequence
)
sequenceRouter.post(
  "/alter",
  validateCredentials(alterSequence),
  sequenceController.alterSequence
)

export default sequenceRouter
