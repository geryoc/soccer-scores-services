import { Match } from '../../../domain/entities/match.entity';
import { MatchStatus } from '../../../domain/enums/match-status.enum';
import { TeamModel } from './team.model';
import { CompetitionModel } from './competition.model';

export class MatchModel {
  id: number;
  competition: CompetitionModel;
  localTeam: TeamModel;
  awayTeam: TeamModel;
  localScore: number;
  awayScore: number;
  matchDate: Date;
  matchStatus: MatchStatus;

  static fromEntity(entity: Match): MatchModel {
    const model = new MatchModel();
    Object.assign(model, entity);
    model.competition = CompetitionModel.fromEntity(entity.competition);
    model.localTeam = TeamModel.fromEntity(entity.localTeam);
    model.awayTeam = TeamModel.fromEntity(entity.awayTeam);
    return model;
  }
}
