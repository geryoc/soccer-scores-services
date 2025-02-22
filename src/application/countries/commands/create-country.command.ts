import { CountryModel } from '../../_shared/models/country.model';
import { Command, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CountryRepository } from '../../../domain/interfaces/repository/country.repository';
import { Inject } from '@nestjs/common';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Country } from '../../../domain/entities/country.entity';

export class CreateCountryCommand extends Command<CountryModel> {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@CommandHandler(CreateCountryCommand)
export class CreateCountryCommandHandler
  implements ICommandHandler<CreateCountryCommand>
{
  constructor(
    @Inject('CountryRepository') private repository: CountryRepository,
  ) {}

  async execute(command: CreateCountryCommand) {
    const newCountry = new Country();
    Object.assign(newCountry, command);
    const savedCountry = await this.repository.create(newCountry);
    return CountryModel.fromEntity(savedCountry);
  }
}
