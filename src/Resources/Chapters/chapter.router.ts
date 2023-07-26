import { Router } from "express"
import { ChapterController } from "./chapter.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { addChapters, getChapters } from "./chapter.schema"

const chapterRouter = Router()
const chapterController = new ChapterController()

chapterRouter.post(
  "/add",
  validateRequest(addChapters),
  chapterController.addChapters
)
chapterRouter.put(
  "/",
  validateRequest(getChapters),
  chapterController.getChapters
)

export default chapterRouter
