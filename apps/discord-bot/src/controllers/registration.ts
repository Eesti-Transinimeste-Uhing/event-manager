import { FormSubmissionData } from '@etu/events-proto/dist/backend/forms'
import { Command } from '@sapphire/framework'
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from 'discord.js'
import { GenderModal } from '../components/gender-select'
import { log } from '../log'
import { decodeCustomId, encodeCustomId } from '../lib/custom-id'
import { RegisterButton } from '../declarations/interaction-handlers'
import { PreferredNameInputModal } from '../components/preferred-name-input'
import { EmailInputModal } from '../components/email-input'
import { AgeInputModal } from '../components/age-input'

type CurrentFormData = {
  name?: string
  email?: string
  age?: string
  gender?: string
  confirm?: boolean
}

export class RegistrationController {
  public static DataButtonId = 'registration-data'

  public async renderRegistrationUi(
    interaction: Command.ChatInputCommandInteraction | ButtonInteraction
  ) {
    const userId = interaction.user.id
    const currentSubmission = this.inProgressSubmissionData.get(userId)

    if (!currentSubmission) {
      throw new Error('No current submission data found')
    }

    const currentData: CurrentFormData = JSON.parse(currentSubmission.data.value)

    await currentSubmission.interaction.editReply({
      embeds: [
        {
          title: 'Registration',
          description:
            'Click on the button next to each field to fill them in, then click "Submit"',
          fields: [
            {
              name: 'Preferred Name',
              value: currentData.name || '(not set)',
            },
            {
              name: 'Email',
              value: currentData.email || '(not set)',
            },
            {
              name: 'Age',
              value: currentData.age || '(not set)',
            },
            {
              name: 'Gender',
              value: currentData.gender || '(not set)',
            },
            {
              name: 'Confirm Event',
              value: currentData.confirm ? 'Confirmed!' : 'Not confirmed',
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
              encodeCustomId(RegisterButton.Name, RegisterButton.Actions.OpenFieldEditor, 'name')
            ),
          new ButtonBuilder()
            .setLabel('Email')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(RegisterButton.Name, RegisterButton.Actions.OpenFieldEditor, 'email')
            ),
          new ButtonBuilder()
            .setLabel('Age')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(RegisterButton.Name, RegisterButton.Actions.OpenFieldEditor, 'age')
            ),
          new ButtonBuilder()
            .setLabel('Gender')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(RegisterButton.Name, RegisterButton.Actions.OpenFieldEditor, 'gender')
            ),
          new ButtonBuilder()
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(
              encodeCustomId(RegisterButton.Name, RegisterButton.Actions.OpenFieldEditor, 'confirm')
            )
        ),
      ],
    })
  }

  public async renderFormFieldEditor(buttonInteraction: ButtonInteraction) {
    const currentSubmission = this.inProgressSubmissionData.get(buttonInteraction.user.id)

    if (!currentSubmission) {
      throw new Error('No current submission data found')
    }

    const { data } = decodeCustomId(buttonInteraction)

    let modalInteraction: ModalSubmitInteraction | null = null

    switch (data) {
      case 'name': {
        await buttonInteraction.showModal(PreferredNameInputModal)
        modalInteraction = await buttonInteraction.awaitModalSubmit({ time: 60_000 })
        break
      }
      case 'email': {
        await buttonInteraction.showModal(EmailInputModal)
        modalInteraction = await buttonInteraction.awaitModalSubmit({ time: 60_000 })
        break
      }
      case 'age': {
        await buttonInteraction.showModal(AgeInputModal)
        modalInteraction = await buttonInteraction.awaitModalSubmit({ time: 60_000 })
        break
      }
      case 'gender': {
        await buttonInteraction.showModal(GenderModal)
        modalInteraction = await buttonInteraction.awaitModalSubmit({ time: 60_000 })
        break
      }
      case 'confirm': {
        await buttonInteraction.deferUpdate()
        await this.updateData(buttonInteraction, data, 'yes')
        break
      }
      default:
        throw new Error('Invalid field')
    }

    if (!modalInteraction) {
      return
    }

    if (modalInteraction.isModalSubmit()) {
      await this.updateData(
        buttonInteraction,
        data,
        modalInteraction.fields.getTextInputValue(data)
      )
    }

    await modalInteraction.deferUpdate()
  }

  private inProgressSubmissionData = new Map<
    string /* userid */,
    { data: FormSubmissionData; interaction: ButtonInteraction | ChatInputCommandInteraction }
  >()

  private async updateData(
    interaction: ButtonInteraction,
    field: keyof CurrentFormData,
    value: CurrentFormData[keyof CurrentFormData]
  ) {
    const userId = interaction.user.id
    const currentSubmission = this.inProgressSubmissionData.get(userId)

    if (!currentSubmission) {
      throw new Error('No current submission data found')
    }

    const currentData: CurrentFormData = JSON.parse(currentSubmission.data.value)

    this.inProgressSubmissionData.set(userId, {
      interaction: currentSubmission.interaction,
      data: FormSubmissionData.fromObject({
        value: JSON.stringify({ ...currentData, [field]: value }),
      }),
    })

    await this.renderRegistrationUi(interaction)
  }

  public async register(interaction: ChatInputCommandInteraction | ButtonInteraction) {
    await interaction.deferReply({ ephemeral: true })

    this.inProgressSubmissionData.set(interaction.user.id, {
      data: FormSubmissionData.fromObject({ value: '{}' }),
      interaction,
    })

    try {
      await this.renderRegistrationUi(interaction)
    } catch (error) {
      if (error instanceof Error) {
        await interaction.followUp({ ephemeral: true, content: `Error: ${error.message}` })
        log.error(error)
      }
    }
  }
}
