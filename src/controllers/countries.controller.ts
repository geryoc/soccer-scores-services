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
import { CountriesService } from '../services/countries.service';
import { CountryModel } from '../models/country/country.model';
import { SaveCountryModel } from '../models/country/save-country.model';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getAll(): Promise<CountryModel[]> {
    return this.countriesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CountryModel> {
    return this.countriesService.getById(id);
  }

  @Post()
  async create(@Body() data: SaveCountryModel): Promise<CountryModel> {
    return this.countriesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: SaveCountryModel,
  ): Promise<CountryModel> {
    return this.countriesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.countriesService.delete(id);
  }
}
