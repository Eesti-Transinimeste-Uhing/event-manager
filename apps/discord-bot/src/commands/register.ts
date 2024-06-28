import { Command } from '@sapphire/framework'
import {
  ActionRowBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import {
  FormFieldKind,
  FormSubmission,
  FormSubmissionData,
  GetFormParams,
} from '@etu/events-proto/dist/backend/forms'

import { formsClient } from '../proto/clients/forms'
import { log } from '../log'
import { GenderModal, GenderSelect } from '../components/gender-select'
import { hash } from '../lib/hash'
import { ConfirmEventSelect } from '../components/yes-no-select'
import { RegistrationController } from '../controllers/registration'

export class FormTestCommand extends Command {
  private registerController = new RegistrationController()

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
    return await this.registerController.register(interaction)
  }
}
