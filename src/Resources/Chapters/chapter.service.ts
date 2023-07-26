import { Language } from "../Language/entity"
import { LanguageService } from "../Language/language.service"
import BaseService from "../Services/base.service"
import db from "../database"
import { Chapters } from "./entity"

const languageService = new LanguageService(db.getRepository(Language))

class ChapterService extends BaseService<Chapters> {
  addChapters = async (chapterList: string[], languageId: number) => {
    try {
      const language = await languageService.findValue({ id: languageId })
      const entries = chapterList.map((chapter) => {
        const tempChapter = new Chapters()
        tempChapter.name = chapter
        tempChapter.language = language
        return tempChapter
      })
      return await this.insertValues(entries)
    } catch (error) {
      throw error
    }
  }
}

const chapterService = new ChapterService(db.getRepository(Chapters))
export default chapterService
