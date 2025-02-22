import { CountryModel } from '../../_shared/models/country.model';
import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CountryRepository } from '../../../domain/interfaces/repository/country.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCountryCommand extends Command<CountryModel> {
  id: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryCommandHandler
  implements ICommandHandler<UpdateCountryCommand>
{
  constructor(
    @Inject('CountryRepository') private repository: CountryRepository,
  ) {}

  async execute(command: UpdateCountryCommand) {
    const country = await this.repository.getById(command.id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${command.id} not found`);
    }
    Object.assign(country, command);
    const savedCountry = await this.repository.update(country);
    return CountryModel.fromEntity(savedCountry);
  }
}
