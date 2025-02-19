import { AppService } from '../app.service';
import { CompetitionsService } from './competitions.service';
import { CountriesService } from './countries.service';
import { TeamsService } from './teams.service';

export const services = [
  AppService,
  TeamsService,
  CompetitionsService,
  CountriesService,
];
