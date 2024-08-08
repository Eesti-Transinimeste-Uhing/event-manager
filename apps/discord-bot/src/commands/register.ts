import { Command } from '@sapphire/framework'
import { RegistrationController } from '../controllers/registration'

export class FormTestCommand extends Command {
  private registrationController = new RegistrationController()

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
      { idHints: ['1270822542482997291'] }
    )
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return await this.registrationController.register(interaction)
  }
}
