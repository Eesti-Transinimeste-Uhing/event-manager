import { Command } from '@sapphire/framework'
import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandStringOption,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import { FormFieldKind, FormSubmission, FormSubmissionData, ObjectFilter } from '@etu/events-proto'

import { formsClient } from '../proto/clients/forms'
import { log } from '../log'
import { GenderModal, GenderSelect } from '../components/gender-select'
import { hash } from '../lib/hash'
import { ConfirmEventSelect } from '../components/yes-no-select'

export class FormTestCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options })
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName('register')
          .setDescription('Register for an upcoming event')
          .addStringOption((option) =>
            option
              .setName('form-id')
              .setDescription('The unique ID of the form you want to submit')
              .setRequired(true)
          ),
      { idHints: ['1225308478478880858'] }
    )
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    try {
      const id = interaction.options.getString('form-id') as string
      const form = await formsClient.getForm(new ObjectFilter({ id }))
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
        new FormSubmission({
          sourceHash: hash(interaction.user.id),
          data: answers,
          where: new ObjectFilter({ id }),
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
