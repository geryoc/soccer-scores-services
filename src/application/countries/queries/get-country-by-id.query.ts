import { CountryModel } from '../../_shared/models/country.model';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { CountryRepository } from '../../../domain/interfaces/repository/country.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { IsDefined, IsNumber } from 'class-validator';

export class GetCountryByIdQuery extends Query<CountryModel> {
  @IsDefined()
  @IsNumber()
  id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}

@QueryHandler(GetCountryByIdQuery)
export class GetCountryByIdQueryHandler
  implements IQueryHandler<GetCountryByIdQuery>
{
  constructor(
    @Inject('CountryRepository') private repository: CountryRepository,
  ) {}

  async execute(query: GetCountryByIdQuery) {
    const country = await this.repository.getById(query.id);
    return CountryModel.fromEntity(country);
  }
}
