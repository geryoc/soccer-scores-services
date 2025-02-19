import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Country } from './country.entity';
import { CompetitionTeam } from './competition-team.entity';

@Entity()
export class Competition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, { nullable: false, eager: true })
  country: Country;

  @OneToMany(
    () => CompetitionTeam,
    (competitionTeam) => competitionTeam.competition,
    { eager: true },
  )
  competitionTeams: CompetitionTeam[];
}
