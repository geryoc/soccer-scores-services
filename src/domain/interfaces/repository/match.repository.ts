import { GenericRepository } from './generic.repository';
import { Match } from '../../entities/match.entity';

export interface MatchRepository extends GenericRepository<Match> {
  getByDate(date: Date): Promise<Match[]>;
}
