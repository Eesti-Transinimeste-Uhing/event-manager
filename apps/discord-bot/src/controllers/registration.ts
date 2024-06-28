import {
  FormFieldKind,
  FormSubmission,
  FormSubmissionData,
  GetFormParams,
} from '@etu/events-proto/dist/backend/forms'
import { Command } from '@sapphire/framework'
import { formsClient } from '../proto/clients/forms'
import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import { GenderModal, GenderSelect } from '../components/gender-select'
import { ConfirmEventSelect } from '../components/yes-no-select'
import { hash } from '../lib/hash'
import { log } from '../log'

export class RegistrationController {
  public async register(interaction: Command.ChatInputCommandInteraction | ButtonInteraction) {
    try {
      const id =
        'customId' in interaction
          ? interaction.customId.split(':')[1]
          : (interaction.options.getString('form-id') as string)
      const form = await formsClient.getForm(GetFormParams.fromObject({ id }))
      const answers: FormSubmissionData[] = []
      const modal = new ModalBuilder().setTitle('Registration').setCustomId('registration')

      if (form.template.fields.includes(FormFieldKind.PreferredName)) {
        modal.addComponents(
          new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
              .setCustomId('name')
              .setLabel('Name')
              .setStyle(TextInputStyle.Short)
          )
        )
      }

      if (form.template.fields.includes(FormFieldKind.Email)) {
        modal.addComponents(
          new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
              .setCustomId('email')
              .setLabel('E-mail')
              .setStyle(TextInputStyle.Short)
          )
        )
      }

      if (form.template.fields.includes(FormFieldKind.Age)) {
        modal.addComponents(
          new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder().setCustomId('age').setLabel('Age').setStyle(TextInputStyle.Short)
          )
        )
      }

      if (modal.components.length) {
        await interaction.showModal(modal)

        const modalInteraction = await interaction.awaitModalSubmit({ time: 60_000 })

        if (modalInteraction.isModalSubmit()) {
          if (form.template.fields.includes(FormFieldKind.Age))
            answers.push(
              new FormSubmissionData({
                name: 'Age',
                value: modalInteraction.fields.getTextInputValue('age'),
              })
            )

          if (form.template.fields.includes(FormFieldKind.Email))
            answers.push(
              new FormSubmissionData({
                name: 'Email',
                value: modalInteraction.fields.getTextInputValue('email'),
              })
            )

          if (form.template.fields.includes(FormFieldKind.PreferredName))
            answers.push(
              new FormSubmissionData({
                name: 'PreferredName',
                value: modalInteraction.fields.getTextInputValue('name'),
              })
            )
        }

        await modalInteraction.deferUpdate()
      }

      if (form.template.fields.includes(FormFieldKind.Gender)) {
        const component = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          GenderSelect
        )

        if (!interaction.replied) {
          await interaction.deferReply({ ephemeral: true })
        }

        const reply = await interaction.followUp({
          ephemeral: true,
          components: [component],
        })

        const response = await reply.awaitMessageComponent({ time: 60_000 })

        if (!response.isStringSelectMenu()) {
          return
        }

        const answer = response.values[0]

        if (answer === 'other') {
          await response.showModal(GenderModal)

          try {
            const modalInteraction = await interaction.awaitModalSubmit({ time: 60_000 })

            if (modalInteraction.isModalSubmit()) {
              answers.push(
                new FormSubmissionData({
                  name: 'Gender',
                  value: modalInteraction.fields.getTextInputValue('gender'),
                })
              )
            }

            await modalInteraction.deferUpdate()
          } catch {
            return
          }
        } else {
          answers.push(
            new FormSubmissionData({
              name: 'Gender',
              value: answer,
            })
          )
          await response.deferUpdate()
        }

        await response.deleteReply()
      }

      if (form.template.fields.includes(FormFieldKind.ConfirmEvent)) {
        const component = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          ConfirmEventSelect
        )

        if (!interaction.replied) {
          await interaction.deferReply({ ephemeral: true })
        }

        const reply = await interaction.followUp({
          ephemeral: true,
          components: [component],
        })

        const response = await reply.awaitMessageComponent({ time: 60_000 })

        if (!response.isStringSelectMenu()) {
          return
        }

        const answer = response.values[0]

        answers.push(
          new FormSubmissionData({
            name: 'ConfirmEvent',
            value: answer,
          })
        )

        await interaction.deleteReply(reply)
      }

      await formsClient.submitForm(
        FormSubmission.fromObject({
          sourceHash: hash(interaction.user.id),
          data: answers,
          where: GetFormParams.fromObject({ id }),
        })
      )

      await interaction.followUp({ ephemeral: true, content: "You're all set!" })
    } catch (error) {
      if (error instanceof Error) {
        await interaction.followUp({ ephemeral: true, content: `Error: ${error.message}` })
        log.error(error)
      }
    }
  }
}
