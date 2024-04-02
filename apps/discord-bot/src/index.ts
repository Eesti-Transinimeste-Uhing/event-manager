import { log } from './log'
import { ProtoServer } from './proto/server'
import { Client } from './discord/client'

const main = async () => {
  log.debug('logging into Discord')
  const client = new Client()
  await client.init()

  log.debug('starting proto server')
  const rpcServer = new ProtoServer(client)
  await rpcServer.listen()

  log.info('bot started')
}

main().catch(console.error)
