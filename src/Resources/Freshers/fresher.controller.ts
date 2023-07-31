import { Request, Response } from "express"
import { IUserDetails } from "../Middleware/Validation/validation"
import fresherService from "./fresher.service"

class FresherController {
  getAllFreshers = async (req: Request, res: Response) => {
    try {
      const { id, email, role, iat } = res.locals.userDetails as IUserDetails
      if (role === "fresher") throw new Error("insufficient privileges")
      const result = await fresherService.findAllValues()
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
}
