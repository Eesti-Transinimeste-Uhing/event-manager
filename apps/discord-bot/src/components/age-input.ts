import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'

const AgeInput = new TextInputBuilder()
  .setLabel('Age')
  .setCustomId('age')
  .setPlaceholder('How old are you?')
  .setRequired(true)
  .setMinLength(1)
  .setMaxLength(3)
  .setStyle(TextInputStyle.Short)

export const AgeInputModal = new ModalBuilder()
  .setTitle('Age')
  .setCustomId('age-modal')
  .addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(AgeInput))
