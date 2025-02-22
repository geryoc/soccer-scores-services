import { GenericRepository } from './generic.repository';
import { Country } from '../../entities/country.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CountryRepository extends GenericRepository<Country> {}
