import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { config } from './config'
import { PinoLogger } from './log/typeorm'
import { log } from './log'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.node.env === 'development',
  logger: new PinoLogger(log.child({ source: 'typeorm' })),
  logging: true,
  entities: ['./entity/**/*.ts'],
  migrations: ['./migration/**/*.ts'],
  subscribers: ['./subscriber/**/*.ts'],
})
