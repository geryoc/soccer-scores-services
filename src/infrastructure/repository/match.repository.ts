import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Match } from '../../domain/entities/match.entity';
import { GenericRepositoryImplementation } from './generic.repository';
import { MatchRepository } from '../../domain/interfaces/repository/match.repository';

@Injectable()
export class MatchRepositoryImplementation
  extends GenericRepositoryImplementation<Match>
  implements MatchRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, Match);
  }
}
