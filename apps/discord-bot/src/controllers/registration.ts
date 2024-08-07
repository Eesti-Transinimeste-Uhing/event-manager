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
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import { GenderModal, GenderSelect } from '../components/gender-select'
import { ConfirmEventSelect } from '../components/yes-no-select'
import { hash } from '../lib/hash'
import { log } from '../log'
import { decodeCustomId, encodeCustomId } from '../lib/custom-id'
import { RegisterButtonInteractionHandler } from '../interaction-handlers/register-button'

export class RegistrationController {
  public static DataButtonId = 'registration-data'

  public async renderRegistrationUi(
    interaction: Command.ChatInputCommandInteraction | ButtonInteraction
  ) {
    const userId = interaction.user.id
    const currentSubmission = this.inProgressSubmissionData.get(userId)
    const currentData = JSON.parse(currentSubmission?.value || '{}')

    console.log('currentData', currentData)

    await interaction.editReply({
      embeds: [
        {
          title: 'Registration',
          description:
            'Click on the button next to each field to fill them in, then click "Submit"',
          fields: [
            {
              name: 'Preferred Name',
              value: '(not set)',
            },
            {
              name: 'Email',
              value: '(not set)',
            },
            {
              name: 'Age',
              value: '(not set)',
            },
            {
              name: 'Gender',
              value: '(not set)',
            },
            {
              name: 'Confirm Event',
              value: '(not set)',
            },
          ],
        },
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setLabel('Preferred Name')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(
                RegisterButtonInteractionHandler.name,
                RegisterButtonInteractionHandler.Actions.UpdateFormData,
                'name'
              )
            ),
          new ButtonBuilder()
            .setLabel('Email')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(
                RegisterButtonInteractionHandler.name,
                RegisterButtonInteractionHandler.Actions.UpdateFormData,
                'email'
              )
            ),
          new ButtonBuilder()
            .setLabel('Age')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(
                RegisterButtonInteractionHandler.name,
                RegisterButtonInteractionHandler.Actions.UpdateFormData,
                'age'
              )
            ),
          new ButtonBuilder()
            .setLabel('Gender')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(
                RegisterButtonInteractionHandler.name,
                RegisterButtonInteractionHandler.Actions.UpdateFormData,
                'gender'
              )
            )
        ),
      ],
    })

    // await interaction.reply({
    //   ephemeral: true,
    //   embeds: [
    //     {
    //       title: 'Preferred Name',
    //       description: 'Please enter your preferred name.',
    //     },
    //     {
    //       title: 'Email',
    //       description: 'Please enter your email.',
    //     },
    //     {
    //       title: 'Age',
    //       description: 'Please enter your age.',
    //     },
    //     {
    //       title: 'Gender',
    //       description: 'Please enter your gender.',
    //     },
    //     {
    //       title: 'Confirm Event',
    //       description: 'Are you coming to the event?',
    //     },
    //   ],
    // })
  }

  private inProgressSubmissionData = new Map<string /* userid */, FormSubmissionData>()

  public async updateData(interaction: ButtonInteraction) {
    // Keyed by user ID, field from interaction customId.
    const userId = interaction.user.id
    const { data } = decodeCustomId(interaction)

    const [field, ...rest] = data.split(':')
    const currentSubmission = this.inProgressSubmissionData.get(userId)

    // If existing data, update it.
    if (currentSubmission) {
      const currentData = JSON.parse(currentSubmission.value)

      this.inProgressSubmissionData.set(
        userId,
        FormSubmissionData.fromObject({
          value: JSON.stringify({ ...currentData, [field]: rest.join(':') }),
        })
      )
    } else {
      this.inProgressSubmissionData.set(
        userId,
        FormSubmissionData.fromObject({ value: JSON.stringify({ [field]: rest.join(':') }) })
      )
    }

    await this.renderRegistrationUi(interaction)
  }

  public async register(interaction: Command.ChatInputCommandInteraction | ButtonInteraction) {
    await interaction.deferReply({ ephemeral: true })

    try {
      await this.renderRegistrationUi(interaction)
    } catch (error) {
      if (error instanceof Error) {
        await interaction.followUp({ ephemeral: true, content: `Error: ${error.message}` })
        log.error(error)
      }
    }
    // await this.renderRegistrationUi(interaction)

    // await interaction.reply({
    //   content: 'default',
    //   ephemeral: true,
    // })

    // try {
    //   const id =
    //     'customId' in interaction
    //       ? interaction.customId.split(':')[1]
    //       : (interaction.options.getString('form-id') as string)
    //   const form = await formsClient.getForm(GetFormParams.fromObject({ id }))
    //   const answers: FormSubmissionData[] = []
    //   const modal = new ModalBuilder().setTitle('Registration').setCustomId('registration')

    //   if (form.template.fields.includes(FormFieldKind.PreferredName)) {
    //     modal.addComponents(
    //       new ActionRowBuilder<TextInputBuilder>().addComponents(
    //         new TextInputBuilder()
    //           .setCustomId('name')
    //           .setLabel('Name')
    //           .setStyle(TextInputStyle.Short)
    //       )
    //     )
    //   }

    //   if (form.template.fields.includes(FormFieldKind.Email)) {
    //     modal.addComponents(
    //       new ActionRowBuilder<TextInputBuilder>().addComponents(
    //         new TextInputBuilder()
    //           .setCustomId('email')
    //           .setLabel('E-mail')
    //           .setStyle(TextInputStyle.Short)
    //       )
    //     )
    //   }

    //   if (form.template.fields.includes(FormFieldKind.Age)) {
    //     modal.addComponents(
    //       new ActionRowBuilder<TextInputBuilder>().addComponents(
    //         new TextInputBuilder().setCustomId('age').setLabel('Age').setStyle(TextInputStyle.Short)
    //       )
    //     )
    //   }

    //   if (modal.components.length) {
    //     await interaction.showModal(modal)

    //     const modalInteraction = await interaction.awaitModalSubmit({ time: 60_000 })

    //     if (modalInteraction.isModalSubmit()) {
    //       if (form.template.fields.includes(FormFieldKind.Age))
    //         answers.push(
    //           new FormSubmissionData({
    //             name: 'Age',
    //             value: modalInteraction.fields.getTextInputValue('age'),
    //           })
    //         )

    //       if (form.template.fields.includes(FormFieldKind.Email))
    //         answers.push(
    //           new FormSubmissionData({
    //             name: 'Email',
    //             value: modalInteraction.fields.getTextInputValue('email'),
    //           })
    //         )

    //       if (form.template.fields.includes(FormFieldKind.PreferredName))
    //         answers.push(
    //           new FormSubmissionData({
    //             name: 'PreferredName',
    //             value: modalInteraction.fields.getTextInputValue('name'),
    //           })
    //         )
    //     }

    //     await modalInteraction.deferUpdate()
    //   }

    //   if (form.template.fields.includes(FormFieldKind.Gender)) {
    //     const component = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    //       GenderSelect
    //     )

    //     if (!interaction.replied) {
    //       await interaction.deferReply({ ephemeral: true })
    //     }

    //     const reply = await interaction.followUp({
    //       ephemeral: true,
    //       components: [component],
    //     })

    //     const response = await reply.awaitMessageComponent({ time: 60_000 })

    //     if (!response.isStringSelectMenu()) {
    //       return
    //     }

    //     const answer = response.values[0]

    //     if (answer === 'other') {
    //       await response.showModal(GenderModal)

    //       try {
    //         const modalInteraction = await interaction.awaitModalSubmit({ time: 60_000 })

    //         if (modalInteraction.isModalSubmit()) {
    //           answers.push(
    //             new FormSubmissionData({
    //               name: 'Gender',
    //               value: modalInteraction.fields.getTextInputValue('gender'),
    //             })
    //           )
    //         }

    //         await modalInteraction.deferUpdate()
    //       } catch {
    //         return
    //       }
    //     } else {
    //       answers.push(
    //         new FormSubmissionData({
    //           name: 'Gender',
    //           value: answer,
    //         })
    //       )
    //       await response.deferUpdate()
    //     }

    //     await response.deleteReply()
    //   }

    //   if (form.template.fields.includes(FormFieldKind.ConfirmEvent)) {
    //     const component = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    //       ConfirmEventSelect
    //     )

    //     if (!interaction.replied) {
    //       await interaction.deferReply({ ephemeral: true })
    //     }

    //     const reply = await interaction.followUp({
    //       ephemeral: true,
    //       components: [component],
    //     })

    //     const response = await reply.awaitMessageComponent({ time: 60_000 })

    //     if (!response.isStringSelectMenu()) {
    //       return
    //     }

    //     const answer = response.values[0]

    //     answers.push(
    //       new FormSubmissionData({
    //         name: 'ConfirmEvent',
    //         value: answer,
    //       })
    //     )

    //     await interaction.deleteReply(reply)
    //   }

    //   await formsClient.submitForm(
    //     FormSubmission.fromObject({
    //       sourceHash: hash(interaction.user.id),
    //       data: answers,
    //       where: GetFormParams.fromObject({ id }),
    //     })
    //   )

    //   await interaction.followUp({ ephemeral: true, content: "You're all set!" })
    // } catch (error) {
    //   if (error instanceof Error) {
    //     await interaction.followUp({ ephemeral: true, content: `Error: ${error.message}` })
    //     log.error(error)
    //   }
    // }
  }
}
