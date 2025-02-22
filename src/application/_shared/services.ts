import { AppService } from '../../app.service';
import { CompetitionsService } from '../competitions/competitions.service';
import { CountriesService } from '../countries/countries.service';
import { MatchesService } from '../matches/matches.service';
import { TeamsService } from '../teams/teams.service';

export const services = [
  AppService,
  TeamsService,
  CompetitionsService,
  CountriesService,
  MatchesService,
];
