import { CreateCountryCommandHandler } from '../countries/commands/create-country.command';
import { DeleteCountryCommandHandler } from '../countries/commands/delete-country.command';
import { UpdateCountryCommandHandler } from '../countries/commands/update-country.command';
import { GetAllCountriesQueryHandler } from '../countries/queries/get-all-countries.query';
import { GetCountryByIdQueryHandler } from '../countries/queries/get-country-by-id.query';

export const handlers = [
  GetCountryByIdQueryHandler,
  GetAllCountriesQueryHandler,
  CreateCountryCommandHandler,
  UpdateCountryCommandHandler,
  DeleteCountryCommandHandler,
];
