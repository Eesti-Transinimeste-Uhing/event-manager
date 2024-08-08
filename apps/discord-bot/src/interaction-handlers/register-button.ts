import {
  InteractionHandler as DiscordInteractionHandler,
  InteractionHandlerTypes,
} from '@sapphire/framework'
import { ButtonInteraction } from 'discord.js'

import { RegisterButton } from '../declarations/interaction-handlers'
import { RegistrationController } from '../controllers/registration'
import { decodeCustomId } from '../lib/custom-id'
import { log } from '../log'

export class InteractionHandler extends DiscordInteractionHandler {
  private registrationController = new RegistrationController()

  public constructor(ctx: DiscordInteractionHandler.LoaderContext) {
    super(ctx, { interactionHandlerType: InteractionHandlerTypes.Button })
  }

  public async run(interaction: ButtonInteraction) {
    const { actionName } = decodeCustomId(interaction)

    try {
      switch (actionName) {
        case RegisterButton.Actions.BeginRegistration:
          return await this.registrationController.register(interaction)
        case RegisterButton.Actions.OpenFieldEditor:
          return await this.registrationController.renderFormFieldEditor(interaction)
      }
    } catch (error) {
      log.error(error)
      if (error instanceof Error) {
        await interaction.reply({
          content: `Error: ${error.message}`,
          ephemeral: true,
        })
      }
    }
  }

  public override parse(interaction: ButtonInteraction) {
    const { handlerName } = decodeCustomId(interaction)

    if (handlerName === RegisterButton.Name) return this.some()

    return this.none()
  }
}
