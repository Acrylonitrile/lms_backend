import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm"
import { Mentor } from "../Mentors/entity"
import { Chapters } from "../Chapters/entity"
import { Enrollment } from "../Enrollment/entity"

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ unique: true, length: 50 })
  name: string
  @ManyToOne(() => Mentor, (mentor) => mentor.language)
  mentor: Mentor
  @OneToMany(() => Chapters, (chapter) => chapter.language)
  chapter: Chapters[]
  @OneToMany(() => Enrollment, (enrollment) => enrollment.language)
  enrollment: Enrollment[]
}
