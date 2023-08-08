import fresherService from "../Freshers/fresher.service"
import languageService from "../Language/language.service"
import BaseService from "../Services/base.service"
import db from "../database"
import { Enrollment } from "./entity"

class EnrollmentService extends BaseService<Enrollment> {
  enrollStudent = async (fresherId: number, languageId: number) => {
    try {
      const [fresher, language] = await Promise.all([
        fresherService.findValue({ id: fresherId }),
        languageService.findValue({ id: languageId })
      ])
      return await this.insertValues({
        ...new Enrollment(),
        fresher,
        language
      })
    } catch (error) {
      throw error
    }
  }
  finishCourse = async (fresherId: number, languageId: number) => {
    try {
      const [fresher, language] = await Promise.all([
        fresherService.findValue({ id: fresherId }),
        languageService.findValue({ id: languageId })
      ])
      const enrollment = await this.findValue({ language, fresher })
      return await this.updateValue(
        { ...enrollment, date_completed: new Date() },
        { language, fresher }
      )
    } catch (error) {
      throw error
    }
  }
}

const enrollmentService = new EnrollmentService(db.getRepository(Enrollment))
export default enrollmentService
