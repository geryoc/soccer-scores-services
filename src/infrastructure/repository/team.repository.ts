import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Team } from '../../domain/entities/team.entity';
import { GenericRepositoryImplementation } from './generic.repository';
import { TeamRepository } from '../../domain/interfaces/repository/team.repository';

@Injectable()
export class TeamRepositoryImplementation
  extends GenericRepositoryImplementation<Team>
  implements TeamRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, Team);
  }
}
