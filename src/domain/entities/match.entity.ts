import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { Competition } from './competition.entity';
import { MatchStatus } from '../../domain/enums/match-status.enum';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, { eager: true, nullable: false })
  localTeam: Team;

  @ManyToOne(() => Team, { eager: true, nullable: false })
  awayTeam: Team;

  @Column({ type: 'int', default: 0 })
  localScore: number;

  @Column({ type: 'int', default: 0 })
  awayScore: number;

  @ManyToOne(() => Competition, { nullable: false, eager: true })
  competition: Competition;

  @Column({ type: 'timestamptz' })
  matchDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: MatchStatus, default: MatchStatus.SCHEDULED })
  status: MatchStatus;
}
