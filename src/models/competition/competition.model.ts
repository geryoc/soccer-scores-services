import { Competition } from '../../entities/competition.entity';
import { TeamModel } from '../team/team.model';
import { CountryModel } from '../country/country.model';

export class CompetitionModel {
  id: number;
  name: string;
  country: CountryModel;
  teams: TeamModel[];

  static fromEntity(entity: Competition): CompetitionModel {
    const model = new CompetitionModel();
    model.id = entity.id;
    model.name = entity.name;
    model.country = CountryModel.fromEntity(entity.country);
    model.teams = entity.competitionTeams.map((competitionTeam) =>
      TeamModel.fromEntity(competitionTeam.team),
    );
    return model;
  }
}
