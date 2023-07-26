import languageService from "../Language/language.service"
import BaseService from "../Services/base.service"
import db from "../database"
import { ChapterSequence } from "./entity"
import sequenceValidation from "./sequence.validation"

class SequenceService extends BaseService<ChapterSequence> {
  addSequence = async (sequence: number[], languageId: number) => {
    try {
      const language = await languageService.findValue({
        where: { id: languageId }
      })
      const newSequence = new ChapterSequence()
      newSequence.sequence = JSON.stringify(sequence)
      newSequence.language = language
      return await this.insertValues(newSequence)
    } catch (error) {
      throw error
    }
  }
  getSequence = async (languageId: number) => {
    try {
      const jsonSequence = await this.findValue({
        where: {
          language: await languageService.findValue({
            where: { id: languageId }
          })
        }
      })
      return (await JSON.parse(jsonSequence.sequence)) as number[]
    } catch (error) {
      throw error
    }
  }
  addNewChapter = async (chapterId: number, languageId: number) => {
    try {
      const sequence = await this.getSequence(languageId)
      if (sequence.findIndex((id) => id === chapterId) !== -1)
        throw new Error("chapter alreaady exists")
      const newSequence = [...sequence]
      newSequence.push(chapterId)
      return await this.addSequence(newSequence, languageId)
    } catch (error) {
      throw error
    }
  }
  alterSequence = async (
    chapterId: number,
    newIndex: number,
    languageId: number
  ) => {
    try {
      const sequence = await this.getSequence(languageId)
      const oldIndex = sequence.findIndex((id) => id === chapterId)
      if (oldIndex === -1) throw new Error("invalid chapterId")
      if (newIndex > sequence.length - 1)
        throw new Error("new index exceeds array length")
      sequence.splice(oldIndex, 1)
      sequence.splice(newIndex, 0, chapterId)
      return await this.addSequence(sequence, languageId)
    } catch (error) {
      throw error
    }
  }
}

const sequenceService = new SequenceService(db.getRepository(ChapterSequence))

export default sequenceService
