import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  discordId: string

  @Column()
  accessToken: string

  @Column('timestamp')
  accessTokenExpiresAt: Date

  @Column()
  refreshToken: string
}
