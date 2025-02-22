import { Provider } from '@nestjs/common';
import { CountryRepositoryImplementation } from './country.repository';
import { MatchRepositoryImplementation } from './match.repository';
import { TeamRepositoryImplementation } from './team.repository';
import { CompetitionRepositoryImplementation } from './competition.repository';

export const repositoryProviders: Provider[] = [
  {
    provide: 'CountryRepository',
    useClass: CountryRepositoryImplementation,
  },
  {
    provide: 'MatchRepository',
    useClass: MatchRepositoryImplementation,
  },
  {
    provide: 'TeamRepository',
    useClass: TeamRepositoryImplementation,
  },
  {
    provide: 'CompetitionRepository',
    useClass: CompetitionRepositoryImplementation,
  },
];
