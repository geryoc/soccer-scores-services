import {
  IsDefined,
  IsEnum,
  IsISO8601,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { MatchStatus } from '../../domain/enums/match-status.enum';

export class SaveMatchModel {
  @IsNumber()
  @IsDefined()
  competitionId: number;

  @IsNumber()
  @IsDefined()
  localTeamId: number;

  @IsNumber()
  @IsDefined()
  awayTeamId: number;

  @IsEnum(MatchStatus)
  @IsDefined()
  status: MatchStatus;

  @IsNumber()
  @IsDefined()
  localScore: number;

  @IsNumber()
  @IsDefined()
  awayScore: number;

  @IsISO8601()
  @IsDefined()
  date: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => o.localTeamId !== o.awayTeamId)
  differentTeams() {
    if (this.localTeamId === this.awayTeamId) {
      throw new Error('localTeamId and awayTeamId must be different');
    }
  }
}
