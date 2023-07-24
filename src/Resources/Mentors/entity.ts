import { Entity, OneToMany } from "typeorm"
import { Admin } from "../Admins/entity"
import { Language } from "../Language/entity"

@Entity()
export class Mentor extends Admin {
  @OneToMany(() => Language, (language) => language.mentor)
  language: Language[]
}
