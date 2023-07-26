import BaseService from "../Services/base.service"
import db from "../database"
import { Fresher } from "./entity"

class FresherService extends BaseService<Fresher> {}

const fresherService = new FresherService(db.getRepository(Fresher))
export default fresherService
