import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'

const EmailInput = new TextInputBuilder()
  .setLabel('E-mail')
  .setCustomId('email')
  .setPlaceholder('What is your e-mail address?')
  .setRequired(true)
  .setMinLength(1)
  .setMaxLength(100)
  .setStyle(TextInputStyle.Short)

export const EmailInputModal = new ModalBuilder()
  .setTitle('E-mail')
  .setCustomId('email-modal')
  .addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(EmailInput))
