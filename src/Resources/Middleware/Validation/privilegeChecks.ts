import { NextFunction, Request, Response } from "express"
import enrollmentService from "../../Enrollment/enrollment.service"
import fresherService from "../../Freshers/fresher.service"
import languageService from "../../Language/language.service"
import mentorService from "../../Mentors/mentors.service"
import { Roles } from "../../Authorization/auth.service"

export const checkEnrollmentFresher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = res.locals.userData.role as Roles
  const id = res.locals.userData.id as number
  if (role === "fresher") {
    try {
      const enrolledLanguages = await enrollmentService.findAllValues({
        fresher: await fresherService.findValue({ id })
      })
      const languageCheck = enrolledLanguages.find(
        (enrollment) => enrollment.languageId === req.body.languageId
      )
      if (!languageCheck)
        throw new Error("you are not enrolled under this language")
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
  next()
}

export const checkEnrollmentMentor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = res.locals.userData.role as Roles
  const id = res.locals.userData.id as number
  if (role === "mentor") {
    try {
      const mentorId = req.body.mentorId as number
      const languageId = req.body.languageId as number

      const languageList = await languageService.findAllValues({
        mentor: await mentorService.findValue({ id })
      })
      const enrolledLanguage = languageList.find(
        (language) => language.id === languageId
      )
      if (!enrolledLanguage)
        throw new Error("You gave not been assigned to this language")
    } catch (error: any) {
      return res.status(400).send({ error: error.message })
    }
  }
  next()
}

export const excludeRole =
  (role: Roles) => async (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.userData.role as Roles
    if (userRole === role)
      return res.status(401).send({ error: "Insufficient Privileges" })
    next()
  }
