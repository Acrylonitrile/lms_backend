import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn
} from "typeorm"
import { Fresher } from "../Freshers/entity"
import { Language } from "../Language/entity"

@Entity()
export class Enrollment {
  @PrimaryColumn()
  fresherId: number
  @ManyToOne(() => Fresher, (fresher) => fresher.enrollment)
  fresher: Fresher
  @PrimaryColumn()
  languageId: number
  @ManyToOne(() => Language, (language) => language.enrollment)
  language: Language
  @CreateDateColumn()
  date_start: Date
  @Column({ nullable: true, default: null })
  date_completed: Date
}
