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

const tableMap = new Map<Roles, EntityTarget<UserTables>>([
  ["admin", Admin],
  ["mentor", Mentor],
  ["fresher", Fresher]
])

const secretMap = new Map<Roles, string>([
  ["admin", process.env.ADMIN_TOKEN_SECRET as string],
  ["fresher", process.env.FRESHER_TOKEN_SECRET as string],
  ["mentor", process.env.MENTOR_TOKEN_SECRET as string]
])

export class AuthService {
  role: Roles
  table: EntityTarget<UserTables>
  tokenSecret: string
  constructor(role: Roles) {
    this.role = role
    this.table = tableMap.get(role) as EntityTarget<UserTables>
    this.tokenSecret = secretMap.get(this.role) as string
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
      throw new Error("failed to signup: " + error.details[0].message)
    }
  }
  login = async (email: string, password: string) => {
    try {
      const userDetails = await db.manager.findOne(this.table, {
        where: { email }
      })
      if (!userDetails) throw { error: "invalid email" }
      const passwordCheck = await bcrypt.compare(password, userDetails.password)
      if (!passwordCheck) throw { error: "invalid password" }
      const accessToken = jwt.sign(
        { email: userDetails.email },
        this.tokenSecret
      )
      return {
        Authorization: "Bearer " + accessToken
      }
    } catch (error: any) {
      throw new Error("failed to signup: " + error.details[0].message)
    }
  }
}
