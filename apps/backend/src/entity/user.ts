import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  discordId: string

  @Column()
  accessToken: string

  @Column('timestamp')
  accessTokenExpiresAt: Date

  @Column()
  refreshToken: string
}
