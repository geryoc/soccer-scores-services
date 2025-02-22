import { CountryModel } from '../../_shared/models/country.model';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { CountryRepository } from '../../../domain/interfaces/repository/country.repository';
import { Inject } from '@nestjs/common';

export class GetAllCountriesQuery extends Query<CountryModel[]> {
  constructor() {
    super();
  }
}

@QueryHandler(GetAllCountriesQuery)
export class GetAllCountriesQueryHandler
  implements IQueryHandler<GetAllCountriesQuery>
{
  constructor(
    @Inject('CountryRepository') private repository: CountryRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetAllCountriesQuery) {
    return this.repository.getAll();
  }
}
