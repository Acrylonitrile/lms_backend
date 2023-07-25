import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ unique: true, length: 50 })
  email: string
  @Column()
  password: string
  @Column({ length: 50 })
  first_name: string
  @Column({ length: 50 })
  last_name: string
}
