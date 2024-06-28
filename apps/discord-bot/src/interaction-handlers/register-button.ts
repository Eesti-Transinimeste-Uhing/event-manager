import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework'
import { ButtonInteraction } from 'discord.js'
import * as RegisterButton from '../components/register-button'
import { RegistrationController } from '../controllers/registration'

export class RegisterButtonInteractionHandler extends InteractionHandler {
  private registrationController = new RegistrationController()

  public constructor(ctx: InteractionHandler.LoaderContext) {
    super(ctx, { interactionHandlerType: InteractionHandlerTypes.Button })
  }

  public async run(interaction: ButtonInteraction) {
    return await this.registrationController.register(interaction)
  }

  public override parse(interaction: ButtonInteraction) {
    // If the custom id does not start with `is-user-awesome`, we do not want this
    // handler to run.
    if (!interaction.customId.startsWith(RegisterButton.id)) return this.none()

    // Here we return a `Some` as said above, in this case passing 9001 to it
    // which we get back in the `run` method as the awesomneness level
    return this.some()
  }
}
