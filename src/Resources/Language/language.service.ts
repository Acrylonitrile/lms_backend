import { Repository } from "typeorm"
import BaseService from "../Services/base.service"
import { Language } from "./entity"
import db from "../database"
import { MentorService } from "../Mentors/mentors.service"
import { getSystemErrorMap } from "util"
import { Mentor } from "../Mentors/entity"

const mentorService = new MentorService(db.getRepository(Mentor))

export class LanguageService extends BaseService<Language> {
  assignMentor = async (id: number, mentorId: number) => {
    try {
      const mentorDetails = await mentorService.findValue({
        where: { id: mentorId }
      })
      console.log(mentorDetails)
      const languageDetails = await this.findValue({ where: { id } })
      console.log(languageDetails)
      if (!mentorDetails) throw new Error("invalid mentorId")
      if (!languageDetails) throw new Error("invalid languageId")
      return await this.updateValue(
        { ...languageDetails, mentor: mentorDetails },
        { id }
      )
    } catch (error: any) {
      throw error
    }
  }
}