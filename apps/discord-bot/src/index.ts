import { log } from './log'
import { ProtoServer } from './proto/server'
import { discord } from './discord/client'

const main = async () => {
  log.debug('logging into Discord')
  await discord.init()

  log.debug('starting proto server')
  const rpcServer = new ProtoServer()
  await rpcServer.listen()

  log.info('bot started')
}

main().catch(console.error)
