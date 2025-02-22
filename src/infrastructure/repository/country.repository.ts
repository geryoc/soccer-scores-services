import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Country } from '../../domain/entities/country.entity';
import { GenericRepositoryImplementation } from './generic.repository';
import { CountryRepository } from '../../domain/interfaces/repository/country.repository';

@Injectable()
export class CountryRepositoryImplementation
  extends GenericRepositoryImplementation<Country>
  implements CountryRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, Country);
  }
}
