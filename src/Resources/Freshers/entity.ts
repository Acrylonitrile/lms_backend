import { Entity, Column, OneToMany, ManyToOne } from "typeorm"
import { Admin } from "../Admins/entity"
import { ChapterStatus } from "../ChapterStatus/entity"
import { Enrollment } from "../Enrollment/entity"

@Entity()
export class Fresher extends Admin {
  @Column({ type: "enum", enum: ["ongoing", "completed"] })
  training_status: "ongoing" | "completed"
  @OneToMany(() => ChapterStatus, (chapterStatus) => chapterStatus.fresher)
  chapterStatus: ChapterStatus[]
  @OneToMany(() => Enrollment, (enrollment) => enrollment.fresher)
  enrollment: Enrollment[]
}
