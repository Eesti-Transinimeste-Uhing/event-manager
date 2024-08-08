import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'

const PreferredNameInput = new TextInputBuilder()
  .setLabel('Preferred name')
  .setCustomId('name')
  .setPlaceholder('What name do you want to go by?')
  .setRequired(true)
  .setMinLength(1)
  .setMaxLength(100)
  .setStyle(TextInputStyle.Short)

export const PreferredNameInputModal = new ModalBuilder()
  .setTitle('Preferred Name')
  .setCustomId('name-modal')
  .addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(PreferredNameInput))
