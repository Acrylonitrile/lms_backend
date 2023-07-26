import { Request, Response } from "express"
import sequenceService from "./sequence.service"

class SequenceController {
  addSequence = async (req: Request, res: Response) => {
    const { sequence, languageId } = req.body
    try {
      const result = await sequenceService.addSequence(sequence, languageId)
      return res.status(201).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  addNewChapter = async (req: Request, res: Response) => {
    const { chapterId, languageId } = req.body
    try {
      const result = await sequenceService.addNewChapter(chapterId, languageId)
      return res.status(201).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  getSequence = async (req: Request, res: Response) => {
    const { languageId } = req.body
    try {
      const result = await sequenceService.getSequence(languageId)
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  alterSequence = async (req: Request, res: Response) => {
    const { chapterId, newIndex, languageId } = req.body
    try {
      const result = await sequenceService.alterSequence(
        chapterId,
        newIndex,
        languageId
      )
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
}

const sequenceController = new SequenceController()
export default sequenceController
