import { GenericRepository } from './generic.repository';
import { Competition } from '../../entities/competition.entity';
import { CompetitionTeam } from '../../entities/competition-team.entity';

export interface CompetitionRepository extends GenericRepository<Competition> {
  createCompetitionTeam(
    competitionId: number,
    teamId: number,
  ): Promise<CompetitionTeam>;

  deleteTeams(competitionId: number): Promise<void>;
}
