import { Country } from '../../entities/country.entity';

export class CountryModel {
  id: number;
  name: string;

  static fromEntity(entity: Country): CountryModel {
    const model = new CountryModel();
    model.id = entity.id;
    model.name = entity.name;
    return model;
  }
}
