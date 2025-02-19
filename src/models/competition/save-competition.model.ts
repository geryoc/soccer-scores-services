import { IsDefined, IsNumber, IsString } from 'class-validator';

export class SaveCompetitionModel {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  countryId: number;

  @IsDefined()
  @IsNumber({}, { each: true })
  teamIds: number[];
}
