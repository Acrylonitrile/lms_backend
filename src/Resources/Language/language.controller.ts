import { Request, Response } from "express"
import languageService from "./language.service"
import { Language } from "./entity"
import { In } from "typeorm"
import { IUserDetails } from "../Middleware/Validation/validation"
import enrollmentService from "../Enrollment/enrollment.service"
import fresherService from "../Freshers/fresher.service"
import mentorService from "../Mentors/mentors.service"

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
  getAllLanguages = async (req: Request, res: Response) => {
    try {
      const { id, email, role, iat } = res.locals.userData as IUserDetails
      if (role === "fresher") {
        const enrollmentList = await enrollmentService.findAllValues({
          fresher: await fresherService.findValue({ id })
        })
        const idList = enrollmentList.map((enrollment) => enrollment.languageId)
        const result = await languageService.findAllValues({ id: In(idList) })
        return res.status(200).send(result)
      } else if (role === "mentor") {
        const result = await languageService.findAllValues({
          mentor: await mentorService.findValue({ id })
        })
        return res.status(200).send(result)
      }
      const result = await languageService.findAllValues()
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
}
