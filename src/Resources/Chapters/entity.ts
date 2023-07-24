import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from "typeorm"
import { Language } from "../Language/entity"
import { ChapterStatus } from "../ChapterStatus/entity"

@Entity()
export class Chapters {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 50 })
  name: string
  @ManyToOne(() => Language, (language) => language.chapter)
  language: Language
  @OneToMany(() => ChapterStatus, (chapterStatus) => chapterStatus.chapter)
  chapterStatus: ChapterStatus[]
}
