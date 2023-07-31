import { Request, Response } from "express"
import { IUserDetails } from "../Middleware/Validation/validation"
import mentorService from "./mentors.service"

class MentorController {
  getAllMentors = async (req: Request, res: Response) => {
    try {
      const { id, email, role, iat } = res.locals.userDetails as IUserDetails
      if (role === "fresher" || "mentor")
        throw new Error("insufficient privileges")
      const result = await mentorService.findAllValues()
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
  getMentor = async (req: Request, res: Response) => {
    try {
      const { id, email, role, iat } = res.locals.userDetails as IUserDetails
      const { mentorId } = req.body
      if (role === "fresher" || (role === "mentor" && id != mentorId))
        throw new Error("insufficient privileges")
      const result = await mentorService.findValue({ id: mentorId })
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
}

const mentorController = new MentorController()
export default mentorController
