import { Request, Response } from "express"
import { LanguageService } from "./language.service"
import { Language } from "./entity"
import db from "../database"

const languageService = new LanguageService(db.getRepository(Language))

export class LanguageController {
  addLanguage = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
      const newLang = new Language()
      newLang.name = name
      const result = await languageService.insertValues(newLang)
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  assignMentor = async (req: Request, res: Response) => {
    const { languageId, mentorId } = req.body
    try {
      const result = await languageService.assignMentor(languageId, mentorId)
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
}
