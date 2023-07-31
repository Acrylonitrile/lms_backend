import { Request, Response } from "express"
import { Roles } from "../Authorization/auth.service"
import adminService from "./admin.service"

class AdminController {
  getAllEntries = async (req: Request, res: Response) => {
    try {
      const role = req.body.role as Roles
      if (role !== "admin") throw new Error("insufficient privileges")
      const result = await adminService.findAllValues()
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(401).send({ error: error.message })
    }
  }
}

const adminController = new AdminController()
export default adminController
