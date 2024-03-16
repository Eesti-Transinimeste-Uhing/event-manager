import { queryField } from 'nexus'

export const CheckDiscordTokenQuery = queryField((t) => {
  // TODO: Call the discord bot via grpc to check if the given token is valid

  t.boolean('checkDiscordToken', {
    resolve() {
      return true
    },
  })
})
