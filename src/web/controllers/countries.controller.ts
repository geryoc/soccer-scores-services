import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CountriesService } from '../../application/countries/countries.service';
import { SaveCountryModel } from '../../application/countries/save-country.model';
import { CountryModel } from '../../application/_shared/models/country.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getAll(): Promise<CountryModel[]> {
    const cachedData =
      await this.cacheManager.get<CountryModel[]>('countries_list');

    if (cachedData) {
      return cachedData;
    }

    const countries = await this.countriesService.getAll();
    const oneHourInMilliseconds = 60 * 60 * 1000;
    await this.cacheManager.set(
      'countries_list',
      countries,
      oneHourInMilliseconds,
    );

    return countries;
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
