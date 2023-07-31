import BaseService from "../Services/base.service"
import db from "../database"
import { Admin } from "./entity"

class AdminService extends BaseService<Admin> {}

const adminService = new AdminService(db.getRepository(Admin))
export default adminService
