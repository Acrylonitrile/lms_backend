import chapterService from "../Chapters/chapter.service"
import fresherService from "../Freshers/fresher.service"
import BaseService from "../Services/base.service"
import db from "../database"
import { ChapterStatus } from "./entity"

class ChapStatusService extends BaseService<ChapterStatus> {
  startChapter = async (fresherId: number, chapterId: number) => {
    try {
      const [fresher, chapter] = await Promise.all([
        fresherService.findValue({ id: fresherId }),
        chapterService.findValue({ id: chapterId })
      ])
      const status = new ChapterStatus()
      status.chapter = chapter
      status.fresher = fresher
      return await this.insertValues(status)
    } catch (error: any) {
      throw error
    }
  }
  finishChapter = async (fresherId: number, chapterId: number) => {
    try {
      const status = await this.findValue({ fresherId, chapterId })
      return await this.insertValues({
        ...status,
        date_end: new Date()
      })
    } catch (error: any) {
      throw error
    }
  }
}

const chapStatusService = new ChapStatusService(db.getRepository(ChapterStatus))

export default chapStatusService
