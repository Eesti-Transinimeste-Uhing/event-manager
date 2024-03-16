import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  bannerPath: string

  @Column()
  content: string
}
