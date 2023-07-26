import { Repository } from "typeorm"
import BaseService from "../Services/base.service"
import { Language } from "./entity"
import db from "../database"
import mentorService from "../Mentors/mentors.service"
import { getSystemErrorMap } from "util"
import { Mentor } from "../Mentors/entity"

export class LanguageService extends BaseService<Language> {
  assignMentor = async (id: number, mentorId: number) => {
    try {
      const mentorDetails = await mentorService.findValue({
        id: mentorId
      })
      const languageDetails = await this.findValue({ id })
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

const languageService = new LanguageService(db.getRepository(Language))
export default languageService
