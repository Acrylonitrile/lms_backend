import { Router } from "express"
import { LanguageController } from "./language.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { addLanguage, assignMentor } from "./validation.schema"

const languageRouter = Router()
const languageController = new LanguageController()

languageRouter.post(
  "/add",
  validateRequest(addLanguage),
  languageController.addLanguage
)
languageRouter.post(
  "/assignmentor",
  validateRequest(assignMentor),
  languageController.assignMentor
)
languageRouter.get("/", languageController.getAllLanguages)

export default languageRouter
