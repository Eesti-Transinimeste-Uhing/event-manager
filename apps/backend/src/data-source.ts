import 'reflect-metadata'
import { DataSource } from 'typeorm'
import path from 'node:path'

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
  synchronize: config.db.sync,
  migrationsRun: config.db.migrate,
  logger: new PinoLogger(log.child({ source: 'typeorm' })),
  logging: true,
  entities: [path.resolve(__dirname, 'entity/**/*.{ts,js}')],
  migrations: [path.resolve(__dirname, './migration/**/*.{ts,js}')],
  subscribers: [path.resolve(__dirname, './subscriber/**/*.{ts,js}')],
})
