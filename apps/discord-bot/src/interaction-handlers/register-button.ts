import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework'
import { ButtonInteraction } from 'discord.js'

import { RegistrationController } from '../controllers/registration'
import { decodeCustomId } from '../lib/custom-id'

export class RegisterButtonInteractionHandler extends InteractionHandler {
  private registrationController = new RegistrationController()

  public static Actions = {
    BeginRegistration: 'begin-registration',
    UpdateFormData: 'update-form-data',
  }

  public constructor(ctx: InteractionHandler.LoaderContext) {
    super(ctx, { interactionHandlerType: InteractionHandlerTypes.Button })
  }

  public async run(interaction: ButtonInteraction) {
    const { actionName } = decodeCustomId(interaction)

    switch (actionName) {
      case RegisterButtonInteractionHandler.Actions.BeginRegistration:
        return await this.registrationController.register(interaction)
      case RegisterButtonInteractionHandler.Actions.UpdateFormData:
        return await this.registrationController.updateData(interaction)
    }
  }

  public override parse(interaction: ButtonInteraction) {
    const { handlerName } = decodeCustomId(interaction)

    if (handlerName === RegisterButtonInteractionHandler.name) return this.some()

    return this.none()
  }
}
