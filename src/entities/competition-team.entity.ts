import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Competition } from './competition.entity';
import { Team } from './team.entity';

@Entity()
export class CompetitionTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition, { nullable: false })
  competition: Competition;

  @ManyToOne(() => Team, { nullable: false, eager: true })
  team: Team;
}
