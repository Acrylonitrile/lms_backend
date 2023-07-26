import { Request, Response } from "express"
import enrollmentService from "./enrollment.service"

class EnrollmentController {
  enrollStudent = async (req: Request, res: Response) => {
    const { fresherId, languageId } = req.body
    try {
      const result = await enrollmentService.enrollStudent(
        fresherId,
        languageId
      )
      return res.status(201).send(result)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
  finishCourse = async (req: Request, res: Response) => {
    const { fresherId, languageId } = req.body
    try {
      const result = await enrollmentService.finishCourse(fresherId, languageId)
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
}

const enrollmentController = new EnrollmentController()
export default enrollmentController
