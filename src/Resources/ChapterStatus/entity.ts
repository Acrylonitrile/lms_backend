import {
  PrimaryColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn
} from "typeorm"
import { Fresher } from "../Freshers/entity"
import { Chapters } from "../Chapters/entity"

@Entity()
export class ChapterStatus {
  @PrimaryColumn()
  fresherId: number
  @ManyToOne(() => Fresher, (fresher) => fresher.chapterStatus)
  fresher: Fresher
  @PrimaryColumn()
  chapterId: number
  @ManyToOne(() => Chapters, (chapters) => chapters.chapterStatus)
  chapter: Chapters
  @CreateDateColumn()
  date_start: Date
  @Column()
  date_end: Date
}
