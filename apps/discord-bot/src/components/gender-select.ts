import {
  ActionRowBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'

export const GenderSelect = new StringSelectMenuBuilder()
  .setCustomId('gender')
  .addOptions(
    new StringSelectMenuOptionBuilder().setLabel('Female').setValue('female'),
    new StringSelectMenuOptionBuilder().setLabel('Male').setValue('male'),
    new StringSelectMenuOptionBuilder().setLabel('Non-binary').setValue('nb'),
    new StringSelectMenuOptionBuilder().setLabel('Other').setValue('other')
  )

export const GenderModal = new ModalBuilder()
  .setTitle('Gender')
  .setCustomId('gender')
  .addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('gender')
        .setLabel('Gender')
        .setPlaceholder('How do you identify?')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(1)
        .setMaxLength(25)
    )
  )
