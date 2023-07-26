import { test } from "node:test"
import {
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository
} from "typeorm"
import db from "../database"

class BaseService<Type extends ObjectLiteral> {
  repo: Repository<Type>
  constructor(repo: Repository<Type>) {
    this.repo = repo
  }
  insertValues = async (value: Type | Type[]) => {
    try {
      console.log(this.repo)
      const result = await db.manager.save(value)
      console.log(result)
      return result
    } catch (error: any) {
      throw error
    }
  }
  findValue = async (options: FindOneOptions<Type>) => {
    try {
      console.log(this.repo.target, options)
      const result = await this.repo.findOne(options)
      if (result === null) throw new Error("null data")
      return result
    } catch (error: any) {
      // console.log(error)
      throw error
    }
  }
  updateValue = async (value: Type, whereOptions: FindOptionsWhere<Type>) => {
    try {
      return await this.repo.update(whereOptions, value)
    } catch (error: any) {
      throw error
    }
  }
}

export default BaseService
