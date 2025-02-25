import { IsDefined, IsNumber, Min } from 'class-validator';

export class UpdateMatchScoreModel {
  @IsDefined()
  @IsNumber()
  @Min(0)
  localScore: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  awayScore: number;
}
