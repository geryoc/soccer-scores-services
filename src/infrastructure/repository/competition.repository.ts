import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Competition } from '../../domain/entities/competition.entity';
import { GenericRepositoryImplementation } from './generic.repository';
import { CompetitionRepository } from '../../domain/interfaces/repository/competition.repository';
import { CompetitionTeam } from '../../domain/entities/competition-team.entity';
import { Team } from '../../domain/entities/team.entity';

@Injectable()
export class CompetitionRepositoryImplementation
  extends GenericRepositoryImplementation<Competition>
  implements CompetitionRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, Competition);
  }

  async createCompetitionTeam(
    competitionId: number,
    teamId: number,
  ): Promise<CompetitionTeam> {
    const competitionTeam = new CompetitionTeam();
    competitionTeam.competition = { id: competitionId } as Competition;
    competitionTeam.team = { id: teamId } as Team;
    return this.entityManager.save(competitionTeam);
  }

  async deleteTeams(competitionId: number): Promise<void> {
    await this.entityManager.delete(CompetitionTeam, {
      competition: { id: competitionId } as Competition,
    });
  }
}
