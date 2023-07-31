import { Router } from "express"
import { ChapterController } from "./chapter.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { addChapters, getChapters } from "./chapter.schema"
import {
  checkEnrollmentFresher,
  checkEnrollmentMentor,
  excludeRole
} from "../Middleware/Validation/privilegeChecks"

const chapterRouter = Router()
const chapterController = new ChapterController()

chapterRouter.post(
  "/add",
  validateRequest(addChapters),
  excludeRole("fresher"),
  checkEnrollmentMentor,
  chapterController.addChapters
)
chapterRouter.put(
  "/",
  validateRequest(getChapters),
  checkEnrollmentMentor,
  checkEnrollmentFresher,
  chapterController.getChapters
)

export default chapterRouter
