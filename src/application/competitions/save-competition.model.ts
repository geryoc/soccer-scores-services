import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveCompetitionModel {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNumber()
  countryId: number;

  @IsDefined()
  @IsNumber({}, { each: true })
  teamIds: number[];
}
