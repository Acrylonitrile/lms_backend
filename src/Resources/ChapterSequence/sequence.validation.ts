import chapterService from "../Chapters/chapter.service"
import { Language } from "../Language/entity"
import lodash from "lodash"
import languageService from "../Language/language.service"
import { Request, Response, NextFunction } from "express"

class SequenceValidation {
  validateNewSequence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { sequence, languageId } = req.body
    try {
      const chapterList = await chapterService.findAllValues({
        where: {
          language: await languageService.findValue({
            where: { id: languageId }
          })
        }
      })
      const idList = chapterList.map((chapter) => chapter.id)
      idList.sort()
      const tempSequence = [...sequence]
      tempSequence.sort()
      if (!lodash.isEqual(idList, tempSequence))
        throw new Error("invalid chapters under given Language")
      next()
    } catch (error) {
      throw error
    }
  }
  validateNewChapter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { chapterId, languageId } = req.body
    try {
      await chapterService.findValue({
        where: {
          id: chapterId,
          language: await languageService.findValue({
            where: { id: languageId }
          })
        }
      })
      next()
    } catch (error) {
      throw error
    }
  }
}

const sequenceValidation = new SequenceValidation()
export default sequenceValidation
