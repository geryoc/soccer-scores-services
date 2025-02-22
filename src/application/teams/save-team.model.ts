import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class SaveTeamModel {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
