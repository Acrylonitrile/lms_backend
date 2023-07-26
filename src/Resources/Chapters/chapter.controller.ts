import { Request, Response } from "express"
import { Chapters } from "./entity"
import chapterService from "./chapter.service"
import languageService from "../Language/language.service"

export class ChapterController {
  addChapters = async (req: Request, res: Response) => {
    try {
      const { chapterList, languageId } = req.body
      const result = await chapterService.addChapters(chapterList, languageId)
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  getChapters = async (req: Request, res: Response) => {
    try {
      const { languageId } = req.body
      const result = await chapterService.findAllValues({
        language: await languageService.findValue({ id: languageId })
      })
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
}
