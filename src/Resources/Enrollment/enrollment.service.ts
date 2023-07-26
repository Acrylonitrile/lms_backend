import fresherService from "../Freshers/fresher.service"
import languageService from "../Language/language.service"
import BaseService from "../Services/base.service"
import db from "../database"
import { Enrollment } from "./entity"

class EnrollmentService extends BaseService<Enrollment> {
  enrollStudent = async (fresherId: number, languageId: number) => {
    try {
      const enrollment = new Enrollment()
      enrollment.fresher = await fresherService.findValue({
        id: fresherId
      })
      enrollment.language = await languageService.findValue({
        id: languageId
      })
      return await this.insertValues(enrollment)
    } catch (error) {
      throw error
    }
  }
  finishCourse = async (fresherId: number, languageId: number) => {
    try {
      const language = await languageService.findValue({ id: languageId })
      const fresher = await fresherService.findValue({ id: fresherId })
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
