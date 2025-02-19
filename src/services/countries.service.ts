import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';
import { CountryModel } from '../models/country/country.model';
import { SaveCountryModel } from '../models/country/save-country.model';
import { EntityManager } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectEntityManager()
    private readonly database: EntityManager,
  ) {}

  async getAll(): Promise<CountryModel[]> {
    return this.database.find(Country);
  }

  async getById(id: number): Promise<CountryModel> {
    const country = await this.database.findOne(Country, { where: { id } });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async create(data: SaveCountryModel): Promise<CountryModel> {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    return this.database.save(newCountry);
  }

  async update(id: number, data: SaveCountryModel): Promise<CountryModel> {
    const country = await this.getById(id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    Object.assign(country, data);
    return this.database.save(country);
  }

  async delete(id: number): Promise<void> {
    const result = await this.database.delete(Country, id);
    if (result.affected === 0) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }
}
