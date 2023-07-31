import { Request, Response } from "express"
import { Chapters } from "./entity"
import chapterService from "./chapter.service"
import languageService from "../Language/language.service"
import { Roles } from "../Authorization/auth.service"
import { IUserDetails } from "../Middleware/Validation/validation"

interface IGetChapters {
  languageId: number
}

interface IAddChapters extends IGetChapters {
  chapterList: string[]
}
export class ChapterController {
  addChapters = async (req: Request, res: Response) => {
    try {
      const { chapterList, languageId } = req.body as IAddChapters
      const result = await chapterService.addChapters(chapterList, languageId)
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  getChapters = async (req: Request, res: Response) => {
    try {
      const { languageId } = req.body as IGetChapters
      const result = await chapterService.findAllValues({
        language: await languageService.findValue({ id: languageId })
      })
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
}
