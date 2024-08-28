import { ButtonBuilder, ButtonStyle } from 'discord.js'
import { encodeCustomId } from '../lib/custom-id'

import { InteractionHandler } from '../interaction-handlers/register-button'
import { RegisterButton } from '../declarations/interaction-handlers'

export const id = 'register-button'

export class SetFormFieldButton extends ButtonBuilder {
  constructor(formId: string) {
    super()

    this.setLabel('Register / Registreeri')
      .setStyle(ButtonStyle.Primary)
      .setCustomId(
        encodeCustomId(
          InteractionHandler.name,
          RegisterButton.Actions.BeginRegistration,
          formId
        )
      )
  }
}
