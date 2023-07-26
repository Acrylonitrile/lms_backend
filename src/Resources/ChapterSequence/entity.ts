import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm"
import { Language } from "../Language/entity"

@Entity()
export class ChapterSequence {
  @PrimaryColumn()
  languageId: number
  @OneToOne(() => Language)
  @JoinColumn()
  language: Language
  @Column({ length: 50, unique: true })
  sequence: string
}
