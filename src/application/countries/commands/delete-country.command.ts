import { Command, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CountryRepository } from '../../../domain/interfaces/repository/country.repository';
import { Inject, NotFoundException } from '@nestjs/common';

export class DeleteCountryCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryCommandHandler
  implements ICommandHandler<DeleteCountryCommand>
{
  constructor(
    @Inject('CountryRepository') private repository: CountryRepository,
  ) {}

  async execute(command: DeleteCountryCommand) {
    const country = await this.repository.getById(command.id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${command.id} not found`);
    }
    await this.repository.delete(command.id);
  }
}
