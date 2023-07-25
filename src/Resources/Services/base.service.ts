import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm"

class BaseService<Type extends ObjectLiteral> {
  repo: Repository<Type>
  constructor(repo: Repository<Type>) {
    this.repo = repo
  }
  insertValues = async (value: Type | Type[]) => {
    try {
      return this.repo.insert(value)
    } catch (error: any) {
      throw new Error("failed to execute query: " + error.details[0].message)
    }
  }
  findValue = async (options: FindOptionsWhere<Type>) => {
    try {
      const result = await this.repo.findOne(options)
    } catch (error: any) {
      throw new Error("failed to execute query: " + error.details[0].message)
    }
  }
  updateValue = async (value: Type, whereOptions: FindOptionsWhere<Type>) => {
    try {
      return this.repo.update(whereOptions, value)
    } catch (error: any) {
      throw new Error("failed to execute query: " + error.details[0].message)
    }
  }
}

export default BaseService
