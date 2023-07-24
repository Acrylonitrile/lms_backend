import { DataSource } from "typeorm"
import env from "dotenv"
import "reflect-metadata"
import { Admin } from "./Admins/entity"
import { Mentor } from "./Mentors/entity"
import { Fresher } from "./Freshers/entity"
import { Language } from "./Language/entity"
import { Chapters } from "./Chapters/entity"
import { ChapterSequence } from "./ChapterSequence/entity"
import { ChapterStatus } from "./ChapterStatus/entity"
import { Enrollment } from "./Enrollment/entity"
env.config()

const db = new DataSource({
  type: "mysql",
  host: process.env.SQL_HOST,
  port: parseInt(process.env.SQL_PORT as string),
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [
    Admin,
    Mentor,
    Fresher,
    Language,
    Chapters,
    ChapterSequence,
    ChapterStatus,
    Enrollment
  ],
  subscribers: [],
  migrations: []
})

export default db
