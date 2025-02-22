import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CountryModel } from '../../application/_shared/models/country.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllCountriesQuery } from '../../application/countries/queries/get-all-countries.query';
import { GetCountryByIdQuery } from '../../application/countries/queries/get-country-by-id.query';
import { CreateCountryCommand } from '../../application/countries/commands/create-country.command';
import { UpdateCountryCommand } from '../../application/countries/commands/update-country.command';
import { DeleteCountryCommand } from '../../application/countries/commands/delete-country.command';

@Controller('countriescqrs')
export class CountriesCqrsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(): Promise<CountryModel[]> {
    return this.queryBus.execute(new GetAllCountriesQuery());
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CountryModel> {
    return this.queryBus.execute(new GetCountryByIdQuery(id));
  }

  @Post()
  async create(@Body() data: CreateCountryCommand): Promise<CountryModel> {
    const command = new CreateCountryCommand();
    command.name = data.name;
    return this.commandBus.execute(command);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCountryCommand,
  ): Promise<CountryModel> {
    const command = new UpdateCountryCommand();
    command.id = id;
    command.name = data.name;
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new DeleteCountryCommand(id));
  }
}
