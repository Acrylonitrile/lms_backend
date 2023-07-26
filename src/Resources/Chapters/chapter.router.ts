import { Router } from "express"
import { ChapterController } from "./chapter.controller"
import { validateCredentials } from "../Middleware/Validation/validation"
import { addChapters, getChapters } from "./chapter.schema"

const chapterRouter = Router()
const chapterController = new ChapterController()

chapterRouter.post(
  "/add",
  validateCredentials(addChapters),
  chapterController.addChapters
)
chapterRouter.put(
  "/",
  validateCredentials(getChapters),
  chapterController.getChapters
)

export default chapterRouter
