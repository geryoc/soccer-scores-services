import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { GenericRepository } from '../../domain/interfaces/repository/generic.repository';
import { Country } from '../../domain/entities/country.entity';
import { SaveCountryModel } from './save-country.model';
import { CountryModel } from '../_shared/models/country.model';

@Injectable()
export class CountriesService {
  constructor(
    @Inject('CountryRepository')
    private readonly countryRepository: GenericRepository<Country>,
  ) {}

  async getAll(): Promise<CountryModel[]> {
    const countries = await this.countryRepository.getAll();
    return countries.map((country) => CountryModel.fromEntity(country));
  }

  async getById(id: number): Promise<CountryModel> {
    const country = await this.countryRepository.getById(id);
    return CountryModel.fromEntity(country);
  }

  async create(data: SaveCountryModel): Promise<CountryModel> {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    return this.countryRepository.create(newCountry);
  }

  async update(id: number, data: SaveCountryModel): Promise<CountryModel> {
    const country = await this.countryRepository.getById(id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    Object.assign(country, data);
    return this.countryRepository.update(country);
  }

  async delete(id: number): Promise<void> {
    const country = await this.countryRepository.getById(id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    await this.countryRepository.delete(id);
  }
}
