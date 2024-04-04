import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js'

export const ConfirmEventSelect = new StringSelectMenuBuilder()
  .setCustomId('confirmEvent')
  .addOptions(
    new StringSelectMenuOptionBuilder().setLabel('Yes').setValue('true'),
    new StringSelectMenuOptionBuilder().setLabel('No').setValue('false')
  )
