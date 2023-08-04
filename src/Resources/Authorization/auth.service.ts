import { EntityTarget, ObjectLiteral, Repository } from "typeorm"
import { Admin } from "../Admins/entity"
import { Fresher } from "../Freshers/entity"
import { Mentor } from "../Mentors/entity"
import BaseService from "../Services/base.service"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import env from "dotenv"
import db from "../database"
env.config()

export type Roles = "admin" | "mentor" | "fresher"
type UserTables = Admin | Mentor | Fresher

export const tableMap = new Map<Roles, EntityTarget<UserTables>>([
  ["admin", Admin],
  ["mentor", Mentor],
  ["fresher", Fresher]
])

export class AuthService {
  role: Roles
  table: EntityTarget<UserTables>
  constructor(role: Roles) {
    this.role = role
    this.table = tableMap.get(role) as EntityTarget<UserTables>
  }

  signUp = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => {
    const passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.SALT as string)
    )
    try {
      const result = await db
        .createQueryBuilder()
        .insert()
        .into(this.table)
        .values({
          email,
          password: passwordHash,
          first_name,
          last_name
        })
        .execute()
      return result
    } catch (error: any) {
      throw error
    }
  }
  login = async (email: string, password: string) => {
    try {
      const userDetails = await db.manager.findOne(this.table, {
        where: { email }
      })
      if (!userDetails) throw new Error("invalid email")
      const passwordCheck = await bcrypt.compare(password, userDetails.password)
      if (!passwordCheck) throw new Error("invalid password")
      const accessToken = jwt.sign(
        { id: userDetails.id, email: userDetails.email, role: this.role },
        process.env.TOKEN_SECRET as string
      )
      return {
        Authorization: accessToken
      }
    } catch (error: any) {
      throw error
    }
  }
}
