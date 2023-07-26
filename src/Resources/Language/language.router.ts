import { Router } from "express"
import { LanguageController } from "./language.controller"
import { validateCredentials } from "../Middleware/Validation/validation"
import { addLanguage, assignMentor } from "./validation.schema"

const languageRouter = Router()
const languageController = new LanguageController()

languageRouter.post(
  "/add",
  validateCredentials(addLanguage),
  languageController.addLanguage
)
languageRouter.post(
  "/assignmentor",
  validateCredentials(assignMentor),
  languageController.assignMentor
)
languageRouter.get("/", languageController.getAllLanguages)

export default languageRouter
