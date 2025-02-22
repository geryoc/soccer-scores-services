import { Team } from '../../../domain/entities/team.entity';

export class TeamModel {
  id: number;
  name: string;

  static fromEntity(entity: Team): TeamModel {
    const model = new TeamModel();
    model.id = entity.id;
    model.name = entity.name;
    return model;
  }
}
