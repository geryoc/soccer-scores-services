import { AppController } from '../../app.controller';
import { CompetitionsController } from './competitions.controller';
import { CountriesCqrsController } from './countries-cqrs.controller';
import { CountriesController } from './countries.controller';
import { MatchesController } from './matches.controller';
import { TeamsController } from './teams.controller';

export const controllers = [
  AppController,
  CompetitionsController,
  TeamsController,
  CountriesController,
  CountriesCqrsController,
  MatchesController,
];
