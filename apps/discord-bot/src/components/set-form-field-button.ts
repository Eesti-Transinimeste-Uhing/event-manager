import { ButtonBuilder, ButtonStyle } from 'discord.js'
import { encodeCustomId } from '../lib/custom-id'
import { RegisterButtonInteractionHandler } from '../interaction-handlers/register-button'

export const id = 'register-button'

export class SetFormFieldButton extends ButtonBuilder {
  constructor(formId: string) {
    super()

    this.setLabel('Register / Registreeri')
      .setStyle(ButtonStyle.Primary)
      .setCustomId(
        encodeCustomId(
          RegisterButtonInteractionHandler.name,
          RegisterButtonInteractionHandler.Actions.BeginRegistration,
          formId
        )
      )
  }
}
