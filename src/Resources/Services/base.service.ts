import { Admin } from "../Admins/entity"
import { ChapterSequence } from "../ChapterSequence/entity"
import { ChapterStatus } from "../ChapterStatus/entity"
import { Chapters } from "../Chapters/entity"
import { Enrollment } from "../Enrollment/entity"
import { Fresher } from "../Freshers/entity"
import { Language } from "../Language/entity"
import { Mentor } from "../Mentors/entity"
import db from "../database"
import {
  EntityTarget,
  ObjectLiteral,
  Repository,
  FindOptionsWhere
} from "typeorm"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"

export type Tables =
  | Admin
  | Mentor
  | Fresher
  | ChapterSequence
  | Chapters
  | Language
  | Enrollment
  | ChapterStatus

class BaseService<Type extends ObjectLiteral> {
  repo: Repository<Type>
  constructor(repo: Repository<Type>) {
    this.repo = repo
  }
  insertValues = async <Type extends ObjectLiteral>(
    values:
      | QueryDeepPartialEntity<ObjectLiteral extends Type ? unknown : Type>
      | QueryDeepPartialEntity<ObjectLiteral extends Type ? unknown : Type>[]
  ) => {
    try {
      const result = await this.repo
        .createQueryBuilder()
        .insert()
        .into(this.repo.target)
        .values(values)
        .execute()
    } catch (error) {}
  }
  findValue = async <Type extends ObjectLiteral>(
    options: FindOptionsWhere<Type>
  ) => {
    try {
      const result = await this.repo.findOne(options)
    } catch (error) {}
  }
}
