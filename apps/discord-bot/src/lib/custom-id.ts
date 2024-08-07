import { ButtonInteraction, ChatInputCommandInteraction } from 'discord.js'

export const encodeCustomId = (handlerName: string, actionName: string, data: string) => {
  return `${handlerName}:${actionName}:${data}`
}

export const decodeCustomId = (
  customIdOrInteraction: string | ButtonInteraction | ChatInputCommandInteraction
) => {
  let customId = ''

  if (typeof customIdOrInteraction === 'string') {
    customId = customIdOrInteraction
  } else {
    customId = 'customId' in customIdOrInteraction ? customIdOrInteraction.customId : ''
  }

  const [handlerName, actionName, ...rest] = customId.split(':')
  return { handlerName, actionName, data: rest.join(':') }
}
