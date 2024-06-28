import { ButtonBuilder, ButtonStyle } from 'discord.js'

export const id = 'register-button'

export class Component extends ButtonBuilder {
  constructor(formId: string) {
    super()

    this.setLabel('Register / Registreeri')
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`${id}:${formId}`)
  }
}
