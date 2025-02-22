import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SaveCountryModel {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
