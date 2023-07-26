import BaseService from "../Services/base.service"
import db from "../database"
import { Mentor } from "./entity"

class MentorService extends BaseService<Mentor> {}

const mentorService = new MentorService(db.getRepository(Mentor))

export default mentorService
