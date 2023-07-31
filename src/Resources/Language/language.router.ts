import { Router } from "express"
import { LanguageController } from "./language.controller"
import { validateRequest } from "../Middleware/Validation/validation"
import { addLanguage, assignMentor } from "./validation.schema"
import { excludeRole } from "../Middleware/Validation/privilegeChecks"

const languageRouter = Router()
const languageController = new LanguageController()

languageRouter.post(
  "/add",
  validateRequest(addLanguage),
  excludeRole("fresher"),
  excludeRole("mentor"),
  languageController.addLanguage
)
languageRouter.post(
  "/assignmentor",
  validateRequest(assignMentor),
  excludeRole("fresher"),
  excludeRole("mentor"),
  languageController.assignMentor
)
languageRouter.get("/", languageController.getAllLanguages)

export default languageRouter
